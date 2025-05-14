/*
  Warnings:

  - You are about to drop the column `location` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `metadata` table. All the data in the column will be lost.
  - Added the required column `key` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverId` to the `metadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_userid_fkey";

-- AlterTable
ALTER TABLE "file" DROP COLUMN "location",
DROP COLUMN "userid",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "src" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "metadata" DROP COLUMN "cover",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'no category',
ADD COLUMN     "coverId" TEXT NOT NULL,
ADD COLUMN     "rights" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY['no tags']::TEXT[],
ALTER COLUMN "publisher" SET DEFAULT 'unknown',
ALTER COLUMN "year" SET DEFAULT 'unknown';

-- CreateTable
CREATE TABLE "Cover" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cover_metadataId_key" ON "Cover"("metadataId");

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
