import { cloudFrontURL } from '@linkgraph/site-info';
import { getCurrentDateTime } from '@linkgraph/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useLink = (userId: string) => {
  const { data: links } = useQuery<Link[]>({
    queryKey: ['links', userId],
    queryFn: async () => {
      const res = await fetch(
        process.env.NODE_ENV === 'production'
          ? 'https://link-graph.vercel.app/api/link?userId=' + userId
          : 'http://localhost:3000/api/link?userId=' + userId,
      );
      return res.json();
    },
    suspense: true,
  });

  return { links };
};

export const useCreateLink = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async ({
      title,
      url,
      image,
      color,
    }: {
      title: string;
      url: string;
      image?: File | null;
      color?: string;
    }) => {
      // 이미지가 없다면 그냥 바로 생성
      if (!image) {
        const res = await fetch('/api/link', {
          method: 'POST',
          body: JSON.stringify({
            url,
            title: title,
            userId: userId,
            color,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return res.json();
      }

      // get presigned url
      const presignedURLResponse = await fetch('/api/presigned-url', {
        method: 'POST',
        body: JSON.stringify({
          name: 'link/' + getCurrentDateTime() + '-' + image.name,
          type: image.type,
        }),
      });
      const { url: presignedURL } = await presignedURLResponse.json();

      const uploadResponse = await fetch(presignedURL, {
        method: 'PUT',
        body: image,
        headers: {
          'Content-type': image.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('서버에 이미지 업로드를 실패했습니다.');
      }

      // 서버에 업로드를 완료했다면 링크를 생성한다.
      const res = await fetch('/api/link', {
        method: 'POST',
        body: JSON.stringify({
          url,
          title,
          userId,
          color,
          image: cloudFrontURL + new URL(presignedURL).pathname,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['links', userId], { exact: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createLink: mutateAsync };
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/link?id=' + id, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['links']);
    },
  });

  return { deleteLink: mutateAsync };
};
