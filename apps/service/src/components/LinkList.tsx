'use client';

import React from 'react';
import Image from 'next/image';

import { useAuth } from '~/hooks/useAuth';
import { useDeleteLink, useLink } from '~/queries/link';

type LinkListProps = {
  userId: string;
};

const LinkList = ({ userId }: LinkListProps) => {
  const { links } = useLink(userId);
  const { deleteLink } = useDeleteLink();

  return (
    <section className="w-full lg:w-1/2">
      <h2 className="mb-4 text-xl font-semibold">링크 목록</h2>
      <ul className="flex flex-col w-full gap-3">
        {links?.map((link: Link) => (
          <li key={link.id} className="flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden relative">
              {/* <div
                className={cn('absolute w-[80px] h-[80px]', link.color ? 'bg-[' + link.color + ']' : 'bg-[#000000]')}
              /> */}

              <div
                className={'w-[80px] h-[80px] relative'}
                style={{
                  backgroundColor: link.color || '#ffffff',
                }}
              >
                {link.image && <Image className="object-cover" src={link.image} alt="링크" fill loading="eager" />}
              </div>
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
