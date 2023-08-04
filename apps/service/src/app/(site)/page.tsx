import { notFound } from 'next/navigation';
import prisma, { getRandomUserWithLinks } from '@linkgraph/db';

import styles from './background.module.css';
import GraphTest from '~/components/Graph';
import { cn } from '~/utils/className';
import RandomUser from './components/RandomUser';

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const Graph = async ({ params: { userId } }: { params: { userId: string } }) => {
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
    })) || (await getRandomUserWithLinks());

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
    <div className={cn('flex flex-col items-center justify-center w-full h-full', styles.background)}>
      <div className="relative w-full h-full max-w-7xl">
        <GraphTest nodes={nodes} links={links} />

        <RandomUser />
      </div>
    </div>
  );
};

export default Graph;
