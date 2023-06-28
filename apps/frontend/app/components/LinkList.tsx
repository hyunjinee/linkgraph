import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

type LinkListProps = {
  links?: Link[];
};

const LinkList = ({ links }: LinkListProps) => {
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
    <div>
      LinkList
      <ul>
        {links?.map((link: any) => (
          <li key={link.id} className="flex items-center gap-5">
            <Image src={link.image || '/profile.png'} alt="링크" width={40} height={40} />
            <div>{link.url}</div>

            <button
              onClick={() => {
                mutateAsync(link.id);
              }}
            >
              삭제
            </button>
            {/* <div>{link.title} : title</div>
            <div>{link.image} : image</div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(LinkList);
