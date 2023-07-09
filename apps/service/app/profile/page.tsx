'use client';

import type { NextPage } from 'next';
import Image from 'next/image';

import LinkForm from '~/components/LinkForm';
import Profile from '~/components/Profile';
import LinkList from '~/components/LinkList';

// TODO if not logged in -> redirect to homepage

const ProfilePage: NextPage = () => {
  return (
    <main className="w-full h-full p-4 mx-auto max-w-7xl md:p-10">
      <div>
        <Profile />

        {/* <ProfileURL /> */}
        <div className="flex gap-4">
          <LinkForm />
          <LinkList />
        </div>

        <div className="w-1/2 h-32 bg-red-50">
          <h3>링크 업로드</h3>
          <Image src="/icons/clip.svg" width={48} height={48} alt="link" />
        </div>

        {/* <section className="w-1/2 p-4 shadow-md rounded-xl">
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
        </section> */}
      </div>
    </main>
  );
};

export default ProfilePage;
