import { notFound } from 'next/navigation';
import { getUserByIdOrURL } from '@linkgraph/db';

import styles from './background.module.css';
import Graph from '~/components/Graph';
import { cn } from '~/utils/className';
import AddLink from './components/AddLinkButton';

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const GraphPage = async ({ params: { userId } }: { params: { userId: string } }) => {
  // 유저의 Id로 넘어오는 값이 uuid 일수도 있지만 유저가 설정한 URL이 올 수도 있다.
  const user = await getUserByIdOrURL(userId);

  if (!user) {
    notFound();
  }

  const userLinks = user.links;

  const nodes: ForcedNode[] = [{ id: userId, img: user.profileImage, size: 80 }];
  const links: ForcedLink[] = userLinks.map((link) => ({ source: userId, target: link.id }));

  userLinks.forEach((link) => {
    nodes.push({ id: link.id, img: link.image || '', size: 40, url: link.url, color: link.color, title: link.title });
  });

  return (
    <div className={cn('flex flex-col items-center justify-center w-full h-full', styles.background)}>
      <div className="relative w-full h-full max-w-7xl">
        <Graph nodes={nodes} links={links} />
        {/* feature toggle */}
        <AddLink />
      </div>
    </div>
  );
};

export default GraphPage;
