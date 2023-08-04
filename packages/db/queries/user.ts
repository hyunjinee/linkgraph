import { Prisma } from '@prisma/client';

type UserWithLinks = Prisma.UserGetPayload<{
  include: {
    links: true;
  };
}>;

export const getRandomUserWithLinks = async (): Promise<UserWithLinks> => {
  const totalRecords = await prisma.user.count();
  const randomIndex = Math.floor(Math.random() * totalRecords);

  const randomUser = await prisma.user.findFirst({
    skip: randomIndex,
    include: {
      links: true,
    },
  });

  if (randomUser && randomUser.links.length >= 3) {
    return randomUser;
  }

  return getRandomUserWithLinks();
};
