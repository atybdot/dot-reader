-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "metadataId" TEXT NOT NULL,
    "userid" TEXT,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL DEFAULT 'not found',
    "year" TEXT NOT NULL DEFAULT 'not found',
    "totalPages" INTEGER NOT NULL DEFAULT 0,
    "ISBN" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "file_metadataId_key" ON "file"("metadataId");

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
