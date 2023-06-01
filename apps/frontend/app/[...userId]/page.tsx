import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@linkgraph/db';

const User = async ({ params }: { params: { userId: string[] } }) => {
  console.log(params);

  const userId = params.userId[0];

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  console.log(user);

  // if (true) {
  //   notFound();
  // }

  return <div>hi</div>;
};

export default User;
