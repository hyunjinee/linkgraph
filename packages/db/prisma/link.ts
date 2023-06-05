import prisma from './client';

export const getLinks = async (userId: string) => {
  try {
    const links = await prisma.link.findMany({
      where: {
        userId,
      },
    });

    return { links };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const createLink = async ({ url, userId }: { url: string; userId: string }) => {
  try {
    const link = await prisma.link.create({
      data: { url, userId },
    });

    return { link };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const countLink = async (userId: string) => {
  try {
    const count = await prisma.link.count({ where: { userId } });
    console.log(count);
    return { count };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
