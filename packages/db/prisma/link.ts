import prisma from './client';

export const createLink = async (url: string) => {
  try {
    const link = await prisma.link.create({
      data: { url, userId: '1' },
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
