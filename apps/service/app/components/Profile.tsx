'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { cloudFrontURL } from '@linkgraph/site-info';

import { useUpload } from '~/hooks/useUpload';
import { useMutation } from '@tanstack/react-query';

const Profile = () => {
  const { data: session } = useSession();
  const [profileImageURL, setProfileImageURL] = useState('');
  const [userURL, setUserURL] = useState('');

  const { mutate: deleteProfileImage } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch('/api/profile-image?id=' + id, {
        method: 'DELETE',
      });
      return res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/profile-url', {
        method: 'PATCH',
        body: JSON.stringify({
          userId: session?.user.id,
          url: userURL,
        }),
      });

      return res.json();
    },
  });

  const [, upload] = useUpload();

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

  const handleImageDelete = () => {
    deleteProfileImage(session?.user.id);
    setProfileImageURL('');
  };

  return (
    <section className="flex flex-col items-center w-full gap-4 p-4 rounded-md sm:flex-row">
      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative flex-shrink-0 w-40 h-40">
          <Image
            onClick={handleImageUpload}
            src={profileImageURL || session?.user.profileImage || session?.user.image || '/profile.png'}
            alt="profile"
            fill
            className="object-cover rounded-full cursor-pointer"
            priority
            quality="100"
            // width={320}
            // height={320}
            // placeholder="blur"
          />
        </div>

        <div className="flex flex-col">
          <button
            onClick={handleImageUpload}
            type="button"
            className="inline-flex justify-center w-32 px-4 py-2 mt-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            이미지 업로드
          </button>
          <button
            onClick={handleImageDelete}
            type="button"
            className="inline-flex justify-center w-32 px-4 py-2 mt-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            이미지 삭제
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-60 bg-gray-100 sm:h-60 sm:w-[2px]" />

      {/* 소개 */}
      <div className="self-start mt-2">
        <div className="text-3xl font-semibold">{session?.user.name}님 안녕하세요.😊</div>

        <div className="mt-4">
          <div>이름: {session?.user.name}</div>
          <div>소개: </div>
          <button onClick={() => mutate()}>수정</button>
        </div>

        <input
          type="text"
          // defaultValue={session?.user.id}
          value={userURL}
          onChange={(e) => setUserURL(e.target.value)}
          className="w-[400px] border-2 border-pink-500"
        />

        <div>https://link-graph.vercel.app/{session?.user.url ?? session?.user.id}</div>
      </div>
    </section>
  );
};

export default Profile;

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
