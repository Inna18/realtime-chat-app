import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, name } = await req.json();

  const newRoom = await prisma.room.create({
    data: {
      name: name,
      creator: {
        connect: { id: userId },
      },
    },
  });

  return NextResponse.json(newRoom);
}