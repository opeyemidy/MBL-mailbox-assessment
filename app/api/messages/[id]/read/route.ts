import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PREDEFINED_USER_ID } from '@/lib/constant';

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await params;

  const id = parseInt(rawId);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
  }

  try {
    const message = await prisma.message.findFirst({
      where: { id, userId: PREDEFINED_USER_ID },
    });

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ id: updated.id, isRead: updated.isRead });
  } catch {
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 },
    );
  }
}
