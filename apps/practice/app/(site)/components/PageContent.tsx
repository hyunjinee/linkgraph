'use client';

import { Song } from '@/types';

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      PageContent
    </div>
  );
};

export default PageContent;
