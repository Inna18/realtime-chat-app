import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pusherServer } from '@/lib/pusherServer';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content, roomId } = await req.json();

  const message = await prisma.message.create({
    data: {
      content,
      roomId,
      senderId: session.user.id,
    },
    include: {
      sender: {
        select: { name: true },
      },
    },
  });

  await pusherServer.trigger(`chat-${roomId}`, 'new-message', message);

  return NextResponse.json(message);
}
