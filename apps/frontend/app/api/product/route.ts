import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

export const GET = async () => {
  const data = await prisma.product.findMany();
  return NextResponse.json(data);
};
