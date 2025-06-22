import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { user, attachId } = await request.json();

    if (!user?.email || !user?.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // hash the password
    const hashedPassword = await hash('12345abc*', 10);

    const newUser = await prisma.user.create({
      data: {
        id: user.id, // optional if auto-generated
        email: user.email,
        password: hashedPassword,
        name: user.name === '' ? user.email : user.name, // if nickname null, name = email
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
