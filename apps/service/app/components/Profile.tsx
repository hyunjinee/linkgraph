'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { cloudFrontURL } from '@linkgraph/site-info';
import { getCurrentDateTime } from '@linkgraph/utils';

import { useUpload } from '~/hooks/useUpload';
import { useDeleteProfileImage } from '~/queries/profile';

const Profile = () => {
  const [imageBlobURL, setImageBlobURL] = useState('');
  const [userURL, setUserURL] = useState('');

  const { data: session, update } = useSession();
  const [file, upload] = useUpload();
  const { deleteProfileImage } = useDeleteProfileImage();

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

  const handleImageUpload = async () => {
    const image = await upload();
    if (!image) {
      return;
    }

    const fileSizeMB = image.size / 1024 / 1024;
    if (fileSizeMB > 4) {
      toast.error('이미지 용량이 너무 큽니다. 4MB 이하의 이미지를 업로드해주세요.');
      return;
    }

    setImageBlobURL(URL.createObjectURL(image));

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

      if (uploadResponse.ok) {
        await fetch('/api/profile-image', {
          method: 'PATCH',
          body: JSON.stringify({
            userId: session?.user.id,
            profileImage: cloudFrontURL + new URL(presignedURL).pathname,
          }),
        });
        await update({
          ...session,
          user: {
            ...session?.user,
            profileImage: cloudFrontURL + new URL(presignedURL).pathname,
          },
        });

        toast.success('이미지 업로드에 성공했습니다.');
      }
    } catch (error) {
      setImageBlobURL('');
      toast.error('이미지 업로드에 실패했습니다.');
      console.log(error);
    }
  };

  const handleImageDelete = async () => {
    await Promise.all([
      deleteProfileImage(session?.user.id),
      update({
        ...session,
        user: {
          ...session?.user,
          profileImage: '',
        },
      }),
    ]);
    setImageBlobURL('');
    toast.success('이미지 삭제에 성공했습니다.');
  };

  return (
    <section className="flex flex-col items-center w-full gap-4 p-4 rounded-md sm:flex-row">
      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative flex-shrink-0 w-40 h-40">
          <Image
            onClick={handleImageUpload}
            src={session?.user.profileImage || imageBlobURL || '/profile.png'}
            alt="profile"
            fill
            className="object-cover rounded-full cursor-pointer"
            priority
            loading="eager"
            quality="100"
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

        {/* 이부분 수정 */}
        <div className="mt-4">
          <div>이름: {session?.user.name}</div>
          <div>{session?.user.description}</div>
          <div>{session?.user.url}</div>
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
