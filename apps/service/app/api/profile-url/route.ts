import { NextResponse } from 'next/server';
import prisma from '@linkgraph/db';

export const PATCH = async (req: Request) => {
  const { url, userId } = await req.json();

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      url,
    },
  });

  return NextResponse.json({
    result,
  });
};

// export const PATCH = async (req: Request) => {
//   const data = await req.json();
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({
//       error: 'You must be signed in to upload a profile image',
//     });
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//   });

//   if (user?.profileImage) {
//     await client.send(
//       new DeleteObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: user.profileImage,
//       }),
//     );
//   }

//   const result = await prisma.user.update({
//     where: {
//       id: session.user.id,
//     },
//     data: {
//       profileImage: data.url,
//     },
//   });

//   return NextResponse.json({
//     result,
//   });
// };
