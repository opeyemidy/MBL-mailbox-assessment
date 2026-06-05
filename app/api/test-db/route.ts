import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // '$queryRaw' executes a low-level ping to the database.
    // If it succeeds, your connection is healthy.
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'success',
        message: 'Database connection established successfully!',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Database connection error:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to the database.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  } finally {
    // Optional: Disconnect if you want to ensure the connection isn't left hanging,
    // though Next.js generally manages this or you should use a global singleton.
    await prisma.$disconnect();
  }
}
