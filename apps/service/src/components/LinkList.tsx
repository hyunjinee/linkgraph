'use client';

import Link from '~/components/Link';
import { useLink } from '~/queries/link';

type LinkListProps = {
  userId: string;
};

const LinkList = ({ userId }: LinkListProps) => {
  const { links } = useLink(userId);

  return (
    <>
      {!links?.length && <div className="mb-4 text-neutral-400">연결된 링크가 없습니다.</div>}
      <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {links?.map((link) => (
          <Link link={link} key={link.id} />
        ))}
      </div>
    </>
  );
};

export default LinkList;
