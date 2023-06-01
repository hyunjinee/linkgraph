'use client';

import { NextPage } from 'next';
import { useState } from 'react';

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
      name: 'client/' + Math.random().toString(36).substring(2, 11) + image.name,
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
  const uploadToFs = () => {};
  const uploadImgMulter = () => {};

  return (
    <div>
      <h1>Select Image</h1>
      <input type="file" name="myimage" onChange={uploadToClient} />
      {image && (
        <>
          <button type="submit" onClick={uploadImgClient}>
            클라이언트에서 바로 업로드
          </button>
          <button type="submit" onClick={uploadToFs}>
            form, fs로 업로드
          </button>
          <button type="submit" onClick={uploadImgMulter}>
            미들웨어, multer로 업로드
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
