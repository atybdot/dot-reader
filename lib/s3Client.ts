import { S3Client } from "@aws-sdk/client-s3";
export const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_URL as string,
  credentials: {
    accessKeyId: process.env.CF_ACCESS as string,
    secretAccessKey: process.env.CF_SECRET as string,
  },
});
