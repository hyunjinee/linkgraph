import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '~/api/auth/[...nextauth]/route';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */
export const GET = async () => {
  const session = await getServerSession(authOptions);
  console.log('hi');
  if (!session) {
    return NextResponse.json({ message: 'You are not logged in' }, { status: 401 });
  }

  return NextResponse.json({ name: session.user?.name });
};
