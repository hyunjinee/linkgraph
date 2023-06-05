'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useUpload } from '~/hooks/useUpload';
import { useState } from 'react';

const ProfileImage = () => {
  const { data: session } = useSession();

  const upload = useUpload();
  const [profileImageURL, setProfileImageURL] = useState('');

  const handleImageUpload = async () => {
    const image = await upload();
    if (!image) {
      return;
    }

    const fileSizeMB = image.size / 1024 / 1024;

    // 4MB 이상 업로드 불가
    if (fileSizeMB > 4) {
      return;
    }

    console.log('hi');

    const body = {
      name: 'profile/' + getCurrentDateTime() + '-' + image.name,
      type: image.type,
    };

    try {
      const presignedURLResult = await fetch('/api/profile-image', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const { url: presignedURL } = await presignedURLResult.json();
      console.log('here');
      console.log(presignedURL);
      const uploadResponse = await fetch(presignedURL, {
        method: 'PUT',
        body: image,
        headers: {
          'Content-type': image.type,
        },
      });
      console.log(uploadResponse);
      if (uploadResponse.status === 200) {
        setProfileImageURL(uploadResponse.url);
      }

      // const upload = await uploadResult.json();
      // console.log(upload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {/* Image Upload Section */}
      <section>
        <Image
          onClick={handleImageUpload}
          src={profileImageURL || '/profile.png'}
          alt="profile"
          width={150}
          height={150}
          className="rounded-full cursor-pointer"
          priority
        />
      </section>
    </div>
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
