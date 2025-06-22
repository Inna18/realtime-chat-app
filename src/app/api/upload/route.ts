import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fileEntry = formData.get('file');
    if (
      !fileEntry ||
      typeof fileEntry !== 'object' ||
      !('arrayBuffer' in fileEntry)
    ) {
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    const file = fileEntry as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const attachment = await prisma.attachment.create({
      data: {
        fileName: file.name ?? 'unknown',
        mimeType: file.type ?? 'application/octet-stream',
        fileSize: file.size,
        content: buffer,
      },
    });

    return new Response(JSON.stringify({ id: attachment.id }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
