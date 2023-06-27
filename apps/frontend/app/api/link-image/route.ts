import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { authOptions } from '../auth/[...nextauth]/route';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const GET = async () => {
  return NextResponse.json({ hi: 'hi' });
};

export const POST = async (req: Request) => {
  const data = await req.json();

  return NextResponse.json({ hi: 'hi' });
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      error: 'You must be signed in to upload a link image',
    });
  }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: session.user.id,
  //   },
  // });

  // if (user?.profileImage) {
  //   await client.send(
  //     new DeleteObjectCommand({
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: user.profileImage,
  //     }),
  //   );
  // }

  // const result = await prisma.user.update({
  //   where: {
  //     id: session.user.id,
  //   },
  //   data: {
  //     profileImage: data.url,
  //   },
  // });

  return NextResponse.json({
    hi: 'hi',
  });
  // return NextResponse.json({
  //   result,
  // });
};
