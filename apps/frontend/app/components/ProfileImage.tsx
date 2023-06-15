'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useUpload } from '~/hooks/useUpload';
import { cloudFrontURL } from '@linkgraph/site-info';
import { useState } from 'react';

const ProfileImage = () => {
  const { data: session } = useSession();
  // TODO session 없으면 not-found 페이지나 첫 홈으로 리다이렉션
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

    // await fetch('/api/profile-image' + '?' + 'userId=' + session?.user.id, {
    //   method: 'DELETE',
    // });
  };

  return (
    <section>
      <div className="relative w-24 h-24">
        <Image
          onClick={handleImageUpload}
          src={profileImageURL || session?.user.profileImage || '/profile.png'}
          alt="profile"
          fill
          className="rounded-full cursor-pointer"
          priority
        />
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
