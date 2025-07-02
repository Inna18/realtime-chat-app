import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, name, description, tags } = await req.json();

  const newRoom = await prisma.room.create({
    data: {
      name: name,
      description: description,
      tags: tags,
      creator: {
        connect: { id: userId },
      },
    },
  });

  return NextResponse.json(newRoom);
}
