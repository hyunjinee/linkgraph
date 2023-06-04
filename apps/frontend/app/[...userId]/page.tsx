import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

const User = async ({ params }: { params: { userId: string[] } }) => {
  console.log(params);

  const userId = params.userId[0];

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  // if (true) {
  //   notFound();
  // }

  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <br />
      <br />
      <br />
      <br />
      <br />
      {JSON.stringify(links, null, 2)}
    </div>
  );
};

export default User;
