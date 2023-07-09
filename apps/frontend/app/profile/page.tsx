'use client';

import type { NextPage } from 'next';
import Image from 'next/image';

import LinkForm from '~/components/LinkForm';
import Profile from '~/components/Profile';
import LinkList from '~/components/LinkList';

// TODO if not logged in -> redirect to homepage

const ProfilePage: NextPage = () => {
  return (
    <main className="mx-auto h-full w-full max-w-7xl p-4 md:p-10">
      <div>
        <Profile />

        {/* <ProfileURL /> */}
        <div className="flex gap-4">
          <LinkForm />
          <LinkList />
        </div>

        <section className="w-1/2 rounded-xl p-4 shadow-md">
          <h2>링크 업로드</h2>
          <div className="flex w-full items-center justify-center gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/clip.svg" width={48} height={48} alt="palette" />
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
            </div>
          </div>
          <div>이미지를 선택해주세요.</div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
