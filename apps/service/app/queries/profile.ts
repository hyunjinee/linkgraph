import { useMutation } from '@tanstack/react-query';

export const useDeleteProfileImage = () => {
  const { mutate: deleteProfileImage, isLoading } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch('/api/profile-image?id=' + id, {
        method: 'DELETE',
      });
      return res.json();
    },
  });

  return { deleteProfileImage, isLoading };
};
