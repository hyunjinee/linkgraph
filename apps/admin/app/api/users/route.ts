import { NextResponse } from 'next/server';
import prisma from '@linkgraph/db';

export const GET = async () => {
  const data = await prisma.user.findMany();
  return NextResponse.json({});

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const result = await prisma.user.delete({
      where: {
        id: data.userId,
      },
    });
    console.log(result);

    return NextResponse.json({ result });
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({});
};

export const DELETE = async (req: Request) => {
  console.log('hi');
  // const data = await req.json();

  // console.log(data);
  try {
    const data = await req.json();
  } catch (error) {
    console.log(error);
  }
  // return NextResponse.json(data);

  return NextResponse.json({});
};
