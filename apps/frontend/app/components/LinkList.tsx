import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
          <li key={link.id}>
            <div>{link.url} : url</div>

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
