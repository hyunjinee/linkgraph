'use client';

import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type LikedContentProps = {
  songs: Song[];
};

const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">No liked songs.</div>;
  }
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center w-full gap-x-4">
          <div className="flex-1">
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
