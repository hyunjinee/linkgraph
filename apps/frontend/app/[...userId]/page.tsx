import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

import LinkGraph from '~/components/LinkGraph';

const Graph = async ({ params }: { params: { userId: string[] } }) => {
  const userId = params.userId[0];
  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // if (true) {
  //   notFound();
  // }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <LinkGraph links={links} />
    </div>
  );
};

export default Graph;
