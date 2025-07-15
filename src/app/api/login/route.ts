import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'online',
      },
    });

    return NextResponse.json(
      { message: 'User status updated' },
      { status: 200 }
    );
  } catch (e) {
    console.error('Error in /api/login:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
