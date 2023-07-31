import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { Song } from '@/types';
import React from 'react';

type SearchContentProps = { songs: Song[] };

const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return <div className="flex flex-col px-6 gap-y-2 text-neutral-400">no songs found</div>;
  }

  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
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

export default SearchContent;
