import { NextResponse } from 'next/server';
import { prisma } from '@linkgraph/db';

export const GET = async () => {
  const data = await prisma.user.findMany();
  return NextResponse.json(data);
};
