export const calculateFileSizeInMB = (file: File) => {
  return file.size / 1024 / 1024;
};

export const getPresignedURL = async (body: { name: string; type: string }) => {
  const res = await fetch('/api/presigned-url', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const { url } = await res.json();

  return url;
};

export const uploadURLToServer = async () => {};

export const uploadImageToS3 = async (presignedURL: string, image: File) => {
  return await fetch(presignedURL, {
    method: 'PUT',
    body: image,
    headers: {
      'Content-type': image.type,
    },
  });
};

export const checkImageSize = (fileSizeInMB: number) => {
  if (fileSizeInMB > 4) {
    throw new Error('이미지 용량이 너무 큽니다. 4MB 이하의 이미지를 업로드해주세요.');
  }
};
