import { useQuery } from '@tanstack/react-query';

export const useLink = (userId: string) => {
  const { data: links } = useQuery<Link[]>({
    queryKey: ['links', userId],
    queryFn: async () => {
      const res = await fetch('/api/link?userId=' + userId);
      return res.json();
    },
    suspense: true,
  });

  return { links };
};
