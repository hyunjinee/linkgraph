import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongsByTitle = async (title: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data: songs, error } = await supabase
    .from('songs')
    .select('*')
    .eq('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    // temp
    console.log(error);
  }

  return songs;
};

export default getSongsByTitle;
