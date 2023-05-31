'use server';

import { createLink } from '@linkgraph/db';
import { revalidatePath } from 'next/cache';

export const createLinkAction = async (url: string) => {
  await createLink(url);
  revalidatePath('/setting');
};
