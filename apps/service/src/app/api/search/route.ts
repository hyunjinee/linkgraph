import prisma from '@linkgraph/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ message: 'No keyword provided' });
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: keyword,
          },
        },
        {
          url: {
            startsWith: keyword,
          },
        },
      ],
    },
  });

  return NextResponse.json(users);
};
