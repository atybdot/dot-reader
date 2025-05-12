/*
  Warnings:

  - You are about to drop the column `ISBN` on the `metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "metadata" DROP COLUMN "ISBN",
ADD COLUMN     "identifiers" TEXT[];
