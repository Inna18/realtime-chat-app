import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cutoff = new Date(Date.now() - 1 * 60 * 1000); // 24 hours ago

  const result = await prisma.user.updateMany({
    where: {
      lastLogin: {
        lt: cutoff,
      },
    },
    data: { status: 'offline' },
  });

  return NextResponse.json({
    message: `Set ${result.count} users to offline.`,
  });
}
