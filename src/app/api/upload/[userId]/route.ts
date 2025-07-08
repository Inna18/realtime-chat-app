import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const attachment = await prisma.attachment.findUnique({
    where: { creatorId: userId },
  });

  if (!attachment) return null;
  return new Response(Buffer.from(attachment.content), {
    headers: {
      'Content-Type': attachment.mimeType,
      'Content-Disposition': `inline; filename="${attachment.fileName}"`,
      'Content-Length': attachment.fileSize.toString(),
    },
  });
}
