import { Suspense } from 'react';

import LinkList from '~/components/LinkList';
import LinkListSkeleton from '~/components/LinkListSkeleton';

type LinkListProps = {
  userId: string;
};

export const LinkListContent = ({ userId }: LinkListProps) => {
  {
    /* TODO Change Skeleton (Size -> mobile, PC) */
  }
  return (
    <section className="w-full">
      <h2 className="mb-3 text-xl font-semibold">링크 목록</h2>
      <Suspense fallback={<LinkListSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <LinkList userId={userId} />
      </Suspense>
    </section>
  );
};
