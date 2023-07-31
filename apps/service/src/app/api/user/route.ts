import { NextResponse } from 'next/server';
import prisma from '@linkgraph/db';

export const GET = async (req: Request) => {
  const userId = new URL(req.url).searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({
      error: 'temp',
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: userId,
        },
        {
          url: userId,
        },
      ],
    },
    include: {
      links: true,
    },
  });

  return NextResponse.json(user);
};
