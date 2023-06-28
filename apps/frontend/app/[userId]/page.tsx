import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

import GraphTest from '~/components/Graph';
import LinkGraph from '~/components/LinkGraph';

const Graph = async ({ params: { userId } }: { params: { userId: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    notFound();
  }

  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      {/* <LinkGraph links={links} /> */}

      <GraphTest />
    </div>
  );
};

export default Graph;
