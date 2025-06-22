-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_creatorId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
