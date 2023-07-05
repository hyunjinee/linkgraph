'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { cloudFrontURL } from '@linkgraph/site-info';

import { useUpload } from '~/hooks/useUpload';

const ProfileImage = () => {
  const { data: session } = useSession();
  const [profileImageURL, setProfileImageURL] = useState<string>('');

  const upload = useUpload();

  const handleImageUpload = async () => {
    const image = await upload();
    if (!image) {
      return;
    }

    const fileSizeMB = image.size / 1024 / 1024;
    if (fileSizeMB > 4) {
      return;
    }

    const body = {
      name: 'profile/' + getCurrentDateTime() + '-' + image.name,
      type: image.type,
    };

    try {
      const presignedURLResponse = await fetch('/api/presigned-url', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const { url: presignedURL } = await presignedURLResponse.json();

      const uploadResponse = await fetch(presignedURL, {
        method: 'PUT',
        body: image,
        headers: {
          'Content-type': image.type,
        },
      });
      // console.log(uploadResponse);
      if (uploadResponse.status === 200) {
      }

      await fetch('/api/profile-image', {
        method: 'PATCH',
        body: JSON.stringify({
          profileImageURL: cloudFrontURL + new URL(presignedURL).pathname,
        }),
      });
      setProfileImageURL(cloudFrontURL + new URL(presignedURL).pathname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex w-full flex-col items-center gap-4 rounded-md p-4 sm:flex-row">
      <div className="flex flex-col items-center">
        <div className="relative h-40 w-40 flex-shrink-0">
          <Image
            onClick={handleImageUpload}
            src={profileImageURL || session?.user.profileImage || session?.user.image || '/profile.png'}
            alt="profile"
            fill
            className="cursor-pointer rounded-full "
            priority
            quality="100"
            // width={320}
            // height={320}
            // placeholder="blur"
          />
        </div>

        <div className="flex flex-col">
          <button
            type="button"
            className="mt-2 inline-flex w-32 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            이미지 업로드
          </button>
          <button
            type="button"
            className="mt-2 inline-flex w-32 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            이미지 삭제
          </button>
        </div>
      </div>

      <div className="h-[2px] w-60 bg-gray-100 sm:h-60  sm:w-[2px]" />

      <div className="mt-2 self-start">
        <div className="text-3xl">{session?.user.name}님 안녕하세요. URL을 설정해보세요!</div>

        <input type="text" defaultValue={session?.user.id} className="w-[400px] border-2 border-pink-500" />

        <div>https://link-graph.vercel.app/{session?.user.url ?? session?.user.id}</div>
      </div>
    </section>
  );
};

export default ProfileImage;

// 현재 날짜와 시간을 포맷팅하는 함수
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTime;
};
