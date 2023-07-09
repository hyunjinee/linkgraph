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
        {/* <div className="flex gap-4">
          <LinkForm />
          <LinkList />
        </div> */}

        <div className="w-full lg:w-1/2 bg-red-50">
          <h3 className="mb-4 text-xl font-semibold">링크 업로드</h3>
          {/* link images, colors */}
          <div className="flex justify-center gap-10 mb-4">
            <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/clip.svg" width={48} height={48} alt="link" />
            </div>
            <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
              <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
            </div>
          </div>
          {/* inputs */}
          <div className="flex flex-col gap-4 mx-4">
            <input
              type="text"
              id="linkTitle"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="링크 제목을 입력해주세요."
              required
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              id="linkURL"
              className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="추가하고 싶은 링크를 입력해주세요."
              required
              // value={linkURL}
              // onChange={onChangeURL}
            />
          </div>
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
