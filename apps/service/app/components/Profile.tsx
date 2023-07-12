'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { cloudFrontURL } from '@linkgraph/site-info';
import { getCurrentDateTime } from '@linkgraph/utils';

import { useUpload } from '~/hooks/useUpload';
import { useDeleteProfileImage, useUpdateProfile } from '~/queries/profile';

const Profile = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userURL, setUserURL] = useState('');
  const [imageBlobURL, setImageBlobURL] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: session, update } = useSession();
  const [file, upload] = useUpload();
  const { deleteProfileImage } = useDeleteProfileImage();
  const { updateProfile } = useUpdateProfile();

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
    await deleteProfileImage(session?.user.id);
    await update({
      ...session,
      user: {
        ...session?.user,
        profileImage: '',
      },
    });
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
      <div className="self-start w-full mt-2">
        {isEditMode ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="이름"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              // value={linkTitle}
              // onChange={(e) => setLinkTitle(e.target.value)}
            />
            <input
              type="text"
              id="linkTitle"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="한 줄 소개"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              id="linkTitle"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="URL"
              required
              value={userURL}
              onChange={(e) => setUserURL(e.target.value)}
            />
            <button
              onClick={async () => {
                await updateProfile({
                  userId: session?.user.id,
                  name,
                  description,
                  url: userURL,
                });
                setIsEditMode(false);
              }}
              className="inline-flex justify-center w-32 px-4 py-2 mt-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              저장
            </button>
          </div>
        ) : (
          <>
            <div className="text-3xl font-semibold">{session?.user.name}님 안녕하세요.😊</div>
            <div className="mt-4">
              <div>{session?.user.description}</div>
              <div>https://link-graph.vercel.app/{session?.user.url ?? session?.user.id}</div>
            </div>
            <button
              className="inline-flex justify-center w-32 px-4 py-2 mt-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={async () => {
                setIsEditMode(true);
                await updateProfile({
                  userId: session?.user.id,
                  name,
                  description,
                  url: userURL,
                });
              }}
            >
              수정
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
