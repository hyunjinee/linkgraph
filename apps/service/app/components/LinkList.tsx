'use client';

import React from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '~/hooks/useAuth';
import { useLink } from '~/queries/link';

const LinkList = () => {
  const session = useAuth();
  const { links } = useLink(session?.user.id);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/link?id=' + id, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['links'], { exact: true });
    },
  });

  return (
    <section className="w-full lg:w-1/2">
      <h2 className="mb-4 text-xl font-semibold">링크 목록</h2>
      <ul className="w-ful">
        {links?.map((link: Link) => (
          <li key={link.id} className="flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center justify-center bg-red-50 rounded-full overflow-hidden">
              <Image
                className="object-cover"
                src={link.image || '/profile.png'}
                alt="링크"
                width={80}
                height={80}
                loading="eager"
                // priority={true}
              />
            </div>
            <div>{link.title}</div>
            <div>{link.url}</div>
            <button
              onClick={() => {
                mutateAsync(link.id);
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
