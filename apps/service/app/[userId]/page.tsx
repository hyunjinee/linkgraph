import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

import GraphTest from '~/components/Graph';

const Graph = async ({ params: { userId } }: { params: { userId: string } }) => {
  // 유저의 Id로 넘어오는 값이 uuid 일수도 있지만 유저가 설정한 URL이 올 수도 있다.
  // 이를 구분하기 위해 먼저 uuid로 유저를 찾고, 없으면 url로 유저를 찾는다.
  let isUUID = true;

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    isUUID = false;
    user = await prisma.user.findUnique({
      where: {
        url: userId,
      },
    });
  }

  // 해당 유저를 찾을 수 없으면 not-found 페이지로 리다이렉션
  if (!user) {
    notFound();
  }

  const userLinks = isUUID
    ? ((await prisma.link.findMany({
        where: {
          userId,
        },
      })) as Link[])
    : ((await prisma.link.findMany({
        where: {
          userId: user.id,
        },
      })) as Link[]);

  const nodes: any = [{ id: userId, img: user.image, size: 60 }];
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
