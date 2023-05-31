import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getSignedFileUrl(data: any) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: data.name,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3, command, {
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

  const res = await s3.send(new PutObjectCommand(uploadParams));
  return res.$metadata.httpStatusCode;
}

export const GET = () => {
  return NextResponse.json({ hi: 'hi' });
};

export const POST = async (req: Request, context: {}) => {
  // console.log(req);
  // const { file } = req.body;
  // console.log(req);

  const data = await req.json();

  console.log(data);
  // console.log(JSON.parse(req.body));
  return NextResponse.json({ hi: 'hi' });
};
