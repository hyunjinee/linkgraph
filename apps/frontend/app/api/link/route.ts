import { NextResponse } from 'next/server';
import { prisma } from '@linkgraph/db';

export const GET = async () => {
  const data = await prisma.link.findMany();
  return NextResponse.json(data);
};

// export const POST = async ({ body }: { body: any }) => {
// const data = await prisma.link.create({
// data: {
// url: body.url,
// title: body.title,
// description: body.description,
// image: body.image,
// user: {
//   connect: {
//     id: body.userId,
//   },
// },
// },
// });
// return NextResponse.json(data);
// };

// export const DELETE = async ({ body }: { body: any }) => {};
