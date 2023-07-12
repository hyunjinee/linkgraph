import { User } from '@prisma/client';
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

export const useUpdateProfile = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ userId, name, url, description }: Partial<Omit<User, 'id'>> & { userId: string }) => {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          userId: userId,
          name,
          url,
          description,
        }),
      });
      return res.json();
    },
  });

  return { updateProfile: mutateAsync };
};
