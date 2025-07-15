import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const onlineUsers = await prisma.user.findMany({
      where: {
        status: 'online',
      },
    });

    return NextResponse.json(onlineUsers);
  } catch (e) {}
}

export async function POST(req: NextRequest) {
  try {
    const { userId, status } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { status },
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
