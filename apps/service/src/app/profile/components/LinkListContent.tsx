import { Suspense } from 'react';
import LinkList from '~/components/LinkList';
import LinkListSkeleton from '~/components/LinkListSkeleton';

type LinkListProps = {
  userId: string;
};

const LinkListContent = ({ userId }: LinkListProps) => {
  return (
    <section className="w-full">
      <h2 className="mb-3 text-xl font-semibold">링크 목록</h2>
      {/* TODO Change Skeleton (Size -> mobile, PC) */}
      <Suspense fallback={<LinkListSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <LinkList userId={userId} />
      </Suspense>
    </section>
  );
};

export default LinkListContent;
