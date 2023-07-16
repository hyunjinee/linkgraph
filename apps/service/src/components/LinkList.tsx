'use client';

import React from 'react';
import Image from 'next/image';

import { useAuth } from '../hooks/useAuth';
import { useDeleteLink, useLink } from '../queries/link';
import clsx from 'clsx';

const LinkList = () => {
  const session = useAuth();
  const { links } = useLink(session?.user.id);
  const { deleteLink } = useDeleteLink();

  return (
    <section className="w-full lg:w-1/2">
      <h2 className="mb-4 text-xl font-semibold">링크 목록</h2>
      <ul className="w-ful">
        {links?.map((link: Link) => (
          <li key={link.id} className="flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden">
              {link.color && !link.image && <div className={clsx('w-full h-full', `bg-[${link.color}]`)} />}
              {link.image && (
                <Image
                  className="object-cover"
                  src={link.image || '/profile.png'}
                  alt="링크"
                  width={80}
                  height={80}
                  loading="eager"
                  // priority={true}
                />
              )}
            </div>
            <div>{link.title}</div>
            <div>{link.url}</div>
            <button
              onClick={async () => {
                await deleteLink(link.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default React.memo(LinkList);
