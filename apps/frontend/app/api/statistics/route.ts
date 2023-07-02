import prisma from '@linkgraph/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const [userCount, linkCount] = await Promise.all([prisma.user.count(), prisma.link.count()]);

  return NextResponse.json({ userCount, linkCount });
};
