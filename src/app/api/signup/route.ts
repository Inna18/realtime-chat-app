import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const { user, attachId } = await request.json();
    console.log(user, attachId);

    if (!user?.email || !user?.password || !user?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        id: user.id, // optional if auto-generated
        email: user.email,
        password: user.password,
        name: user.name,
        ...(attachId && {
          avatar: {
            connect: { id: attachId },
          },
        }),
      },
    });

    if (attachId) {
      await prisma.attachment.update({
        where: { id: attachId },
        data: {
          creator: {
            connect: { id: newUser.id },
          },
        },
      });
    }

    return NextResponse.json(newUser);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
