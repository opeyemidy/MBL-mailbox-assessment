import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PREDEFINED_USER_ID = 1;

export async function GET() {
  try {
    const [user, total, unread] = await Promise.all([
      prisma.user.findUnique({ where: { id: PREDEFINED_USER_ID } }),
      prisma.message.count({ where: { userId: PREDEFINED_USER_ID } }),
      prisma.message.count({
        where: { userId: PREDEFINED_USER_ID, isRead: false },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ userName: user.name, total, unread });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}
