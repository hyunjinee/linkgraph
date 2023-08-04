import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

import GraphTest from '~/components/Graph';

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const Graph = async ({ params: { userId } }: { params: { userId: string } }) => {
  // const res = await fetch('http://localhost:3000/api/user?userId=' + userId, {
  //   cache: 'no-store',
  // });
  // const user = await res.json();
  /*
    유저의 Id로 넘어오는 값이 uuid 일수도 있지만 유저가 설정한 URL이 올 수도 있다.
  */

  const user =
    (await prisma.user.findFirst({
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
    })) || (await getRandomRecord());

  async function getRandomRecord() {
    const totalRecords = await prisma.user.count();
    const randomIndex = Math.floor(Math.random() * totalRecords);

    const randomRecord = await prisma.user.findFirst({
      skip: randomIndex,
      include: {
        links: true,
      },
    });

    return randomRecord;
  }

  if (!user) {
    notFound();
  }

  const userLinks = user.links;

  const nodes: ForcedNode[] = [{ id: userId, img: user.profileImage, size: 80 }];
  const links: ForcedLink[] = userLinks.map((link) => ({ source: userId, target: link.id }));

  userLinks.forEach((link) => {
    nodes.push({ id: link.id, img: link.image || '', size: 40, url: link.url, color: link.color });
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <GraphTest nodes={nodes} links={links} />
    </div>
  );
};

export default Graph;
