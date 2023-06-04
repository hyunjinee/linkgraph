'use client';

import { NextPage } from 'next';
import { useState } from 'react';

// 현재 날짜와 시간을 포맷팅하는 함수
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return dateTime;
};

const ImageUpload: NextPage = () => {
  const [image, setImage] = useState<File>();
  const [createObjectURL, setCreateObjectURL] = useState('');

  console.log(image, 'image', typeof image);
  // console.log(createObjectURL, 'createObjectURL');

  const uploadToClient = (e: any) => {
    if (createObjectURL) {
      URL.revokeObjectURL(createObjectURL);
    }

    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setCreateObjectURL(URL.createObjectURL(e.target.files[0]));
    }
  };
  const uploadImgClient = async () => {
    if (!image) {
      return;
    }

    const body = {
      name: 'profile/' + getCurrentDateTime() + '-' + image.name,
      type: image.type,
    };

    try {
      // 1단계 : signed url 가져오기
      const urlRes = await fetch('/api/profile-image', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await urlRes.json();

      console.log(data);

      const signedUrl = data.url;

      const uploadResult = await fetch(signedUrl, {
        method: 'PUT',
        body: image,
        headers: {
          'Content-type': image.type,
        },
      });
      console.log(uploadResult);
      // console.log('signedUrl', signedUrl);

      // console.log(signedUrl);
    } catch (error) {}
  };

  return (
    <div>
      <h1>Select Image</h1>
      <input type="file" name="myimage" onChange={uploadToClient} />
      {image && (
        <>
          <button type="submit" onClick={uploadImgClient}>
            클라이언트에서 바로 업로드
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
