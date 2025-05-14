"use server";

import { S3 } from "@/lib/s3Client";
import { Upload } from "@aws-sdk/lib-storage";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { PartialMetadata } from "@/types/metadata";

interface UploadProps {
  book: File;
  coverBlob: Blob;
  metadata: Omit<PartialMetadata, "coverUrl">;
  coverKey?: string;
  bookKey?: string;
}
export async function uploadData(prop: UploadProps) {
  const { book, bookKey, coverBlob, metadata } = prop;
  const user = await currentUser();
  if (!(user?.id && user?.primaryEmailAddress?.emailAddress)) {
    throw Error("not a valid user");
  }
  const userInBb = await getUser(user.id);
  if (userInBb === null) {
    await createUser(user.id, user.primaryEmailAddress.emailAddress);
  }
  let objectData;
  try {
    objectData = await Promise.all([
      uploadBook(book, bookKey ?? metadata.title, user.id),
      uploadCover(
        coverBlob,
        `${metadata.title}-cover.${coverBlob.type.split("/")[1]}`,
        user.id
      ),
    ]);
  } catch (e) {
    throw e;
  }
  try {
    const d = await prisma.metadata.create({
      data: {
        ...metadata,
        cover: {
          create: {
            key: objectData[1].Key!,
            src: objectData[1].Location!,
          },
        },
        File: {
          create: {
            userId: user.id,
            key: objectData[0].Key!,
            src: objectData[0].Location!,
          },
        },
      },
    });
    console.log(d);
    // await prisma.file.create({
    //   data: {
    //     userid: user.id,
    //     src: objectData[0].Location!,
    //     key: objectData[0].Key!,
    //     metadata: {},
    //   },
    // });
  } catch (err) {
    throw Error(`${err}`);
  }
}

async function createUser(id: string, email: string) {
  try {
    await prisma.user.create({
      data: {
        id: id,
        email: email,
      },
    });
  } catch (e) {
    throw Error(`unable to create user \n${e}`);
  }
}
async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

async function uploadCover(blob: Blob, key: string, userId: string) {
  try {
    const upload = new Upload({
      client: S3,
      params: {
        Bucket: process.env.COVER_BUCKET_NAME as string,
        Key: key,
        Body: blob,
        ContentType: blob.type,
        Metadata: {
          userId,
        },
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: true,
    });

    const data = await upload.done();
    return data;
  } catch (e) {
    throw e;
  }
}

async function uploadBook(file: File, key: string, userId: string) {
  try {
    const upload = new Upload({
      client: S3,
      params: {
        Bucket: process.env.BUCKET_NAME as string,
        Key: key,
        Body: file,
        ContentType: file.type ?? "application/epub+zip",
        Metadata: {
          userId,
        },
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: true,
    });
    const data = await upload.done();
    return data;
  } catch (e) {
    throw e;
  }
}
