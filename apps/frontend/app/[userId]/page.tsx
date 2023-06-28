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
  // 해당 유저를 찾을 수 없으면 not-found 페이지로 리다이렉션
  if (!user) {
    notFound();
  }

  const links = (await prisma.link.findMany({
    where: {
      userId,
    },
  })) as Link[];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      {/* <LinkGraph links={links} /> */}

      <GraphTest links={links} />
    </div>
  );
};

export default Graph;
