import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  // const links = await prisma.link.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  // });

  return NextResponse.json({
    message: 'Hello World',
  });
};
