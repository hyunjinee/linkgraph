import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const command = new GetObjectCommand({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: process.env.AWS_ACCESS_KEY_ID,
});

async function getSignedFileUrl(data: any) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: data.name,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command, {
    expiresIn: 3600,
  });
  return url;
}

async function uploadFile(fileBuffer: any, fileName: any, mimetype: any) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  const res = await client.send(new PutObjectCommand(uploadParams));
  return res.$metadata.httpStatusCode;
}

export const POST = async (req: Request, context: {}) => {
  const data = await req.json();

  console.log(data);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: data.name,
    ContentType: data.type,
  });
  // const preSignedUrl = await getSignedFileUrl(client);

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  // console.log(JSON.parse(req.body));

  // const result = await fetch(signedUrl, {
  //   method: 'PUT',
  //   body:
  // })
  return NextResponse.json({
    url: signedUrl,
  });
};
