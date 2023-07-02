'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import ProfileURL from '~/components/ProfileURL';
import LinkList from '~/components/LinkList';

// TODO if not logged in -> redirect to homepage

const Profile: NextPage = () => {
  const { data: links } = useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: async () => {
      const res = await fetch('/api/link');
      return res.json();
    },
    suspense: true,
  });

  return (
    <main className="w-full h-full p-4 mx-auto max-w-7xl md:p-10">
      <ProfileImage />

      {/* <ProfileURL /> */}
      <div className="flex gap-4">
        <LinkForm />
        <LinkList links={links} />
      </div>

      <section className="w-1/2 p-4 shadow-md rounded-xl">
        <h2>링크 업로드</h2>
        <div className="flex items-center justify-center w-full gap-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            <Image src="/icons/clip.svg" width={48} height={48} alt="palette" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
            <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
          </div>
        </div>
        <div>이미지를 선택해주세요.</div>
      </section>
    </main>
  );
};

export default Profile;
