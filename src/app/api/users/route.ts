import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  console.log('users', users);
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.namm,
    },
  });
  return NextResponse.json(newUser);
}
