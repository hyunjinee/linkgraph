import prisma from '@linkgraph/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async () => {
  return NextResponse.json({ hi: 'hi' });
};

export const POST = async (req: Request) => {
  const data = await req.json();

  console.log(data);
  return NextResponse.json({ hi: 'hi' });
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const result = await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      url: data.url,
    },
  });

  console.log(data);
  return NextResponse.json({ result });
};
