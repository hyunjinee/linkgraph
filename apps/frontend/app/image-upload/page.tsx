'use client';

import { NextPage } from 'next';
import { useState } from 'react';

const ImageUpload: NextPage = () => {
  const [image, setImage] = useState();
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (e: any) => {};
  const uploadImgClient = async () => {
    console.log('hi');
  };

  return (
    <div>
      <h1>Select Image</h1>
      <input type="file" name="myimage" />
      <button type="submit" onClick={uploadImgClient} className="bg-red-300">
        클라이언트에서 바로 업로드
      </button>
    </div>
  );
};

export default ImageUpload;
