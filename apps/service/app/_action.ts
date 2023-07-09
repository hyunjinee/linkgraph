'use server';

/*
  this is a server action file.
  this project is not using server actions now.

  프로젝트에 서버 액션을 추가하려면 이 파일을 수정한다.
*/

import { createLink } from '@linkgraph/db';
import { revalidatePath } from 'next/cache';

export const createLinkAction = async (url: string) => {
  await createLink({ url, userId: 'hyunjin' });
  revalidatePath('/setting');
};
