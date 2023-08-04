export const getRandomUserWithLinks = async () => {
  const totalRecords = await prisma.user.count();
  const randomIndex = Math.floor(Math.random() * totalRecords);

  const randomUser = await prisma.user.findFirst({
    skip: randomIndex,
    include: {
      links: true,
    },
  });

  return randomUser;
};
