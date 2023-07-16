import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: '로그인이 되어있지 않아요.' }, { status: 401 });
  }

  return NextResponse.json({ message: '로그인이 되어있어요.', name: session.user?.name });
};
