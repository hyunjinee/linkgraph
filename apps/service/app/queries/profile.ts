import { useMutation } from '@tanstack/react-query';

export const useDeleteProfileImage = () => {
  const { mutateAsync: deleteProfileImage, isLoading } = useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch('/api/profile-image?userId=' + userId, {
        method: 'DELETE',
      });
      return res.json();
    },
  });

  return { deleteProfileImage, isLoading };
};
