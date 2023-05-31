import prisma from './client';

export const createLink = async (url: string) => {
  try {
    const link = await prisma.link.create({
      data: { url, userId: '1' },
    });

    console.log(link);

    return { link };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
