import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'online',
      },
    });
  } catch (e) {}
}
