import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const room = await prisma.room.findUnique({
    where: { id: id },
    include: {
      messages: {
        include: {
          sender: {
            select: {
              name: true, // Include sender's name
            },
          },
        },
        orderBy: { createdAt: 'asc' }, // Optional: sort messages chronologically
      },
    },
  });

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }
  console.log(room);

  return NextResponse.json(room);
}
