import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PREDEFINED_USER_ID } from '@/lib/constant';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      where: { userId: PREDEFINED_USER_ID },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        subject: true,
        content: true,
        isRead: true,
        createdAt: true,
      },
    });

    return NextResponse.json(messages);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 },
    );
  }
}
