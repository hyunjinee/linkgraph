import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma, { countLink } from '@linkgraph/db';
import { authOptions } from '~/api/auth/[...nextauth]/route';

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({
      message: '로그인을 해주세요.',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: '유저를 찾을 수 없습니다.',
    });
  }

  const data = await prisma.link.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({
      message: '로그인을 해주세요.',
    });
  }

  const linkCount = await countLink(data.userId);

  if (linkCount > 30) {
    return NextResponse.json({
      message: '링크는 30개까지만 등록할 수 있습니다.',
    });
  }

  const link = await prisma.link.create({
    data: {
      userId: data.userId,
      url: data.url,
      title: data.title,
      image: data.image,
    },
  });

  return NextResponse.json(link);
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || '';

  const link = await prisma.link.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(link);
};