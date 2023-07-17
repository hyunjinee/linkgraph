import prisma from '@linkgraph/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  return NextResponse.json({ hi: 'hi' });
};
