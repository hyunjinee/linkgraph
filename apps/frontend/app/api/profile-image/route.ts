import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import prisma from '@linkgraph/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

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

const deleteCommand = new DeleteObjectCommand({
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

export const GET = () => {
  return NextResponse.json({ hi: 'hi' });
};

export const PATCH = async (req: Request, context: {}) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      error: 'You must be signed in to upload a profile image',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.profileImage) {
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: user.profileImage,
      }),
    );
  }

  console.log('hi', data.profileImageURL);

  const result = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      profileImage: data.profileImageURL,
    },
  });

  return NextResponse.json({
    result,
  });
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({
      error: 'You must be signed in to upload a profile image',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return NextResponse.json({ test: 'test' });
};
