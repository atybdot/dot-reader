-- DropForeignKey
ALTER TABLE "Cover" DROP CONSTRAINT "Cover_metadataId_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_metadataId_fkey";

-- AlterTable
ALTER TABLE "Cover" ALTER COLUMN "metadataId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "metadataId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "metadata" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "coverId" DROP NOT NULL,
ALTER COLUMN "rights" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
