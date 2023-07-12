import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

import GraphTest from '~/components/Graph';

// export const fetchCache = 'force-no-store';
export const revalidate = 0;

const Graph = async ({ params: { userId } }: { params: { userId: string } }) => {
  // 유저의 Id로 넘어오는 값이 uuid 일수도 있지만 유저가 설정한 URL이 올 수도 있다.
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: userId,
        },
        {
          url: userId,
        },
      ],
    },
    include: {
      links: true,
    },
  });

  if (!user) {
    notFound();
  }

  const userLinks = user.links;

  const nodes: any = [{ id: userId, img: user.image, size: 80 }];
  const links = userLinks.map((link) => ({ source: userId, target: link.id }));

  userLinks.forEach((link) => {
    nodes.push({ id: link.id, img: link.image || '', size: 40, url: link.url });
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      {/* <LinkGraph links={links} /> */}
      <GraphTest nodes={nodes} links={links} />
    </div>
  );
};

export default Graph;
