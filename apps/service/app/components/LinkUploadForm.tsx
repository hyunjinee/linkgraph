'use client';

import Image from 'next/image';
import { useState } from 'react';

const LinkUploadForm = () => {
  const [title, setTitle] = useState('');
  const [URL, setURL] = useState('');

  return (
    <section className="w-full lg:w-1/2">
      {/* title */}
      <h2 className="mb-4 text-xl font-semibold">링크 업로드</h2>

      {/* link images, colors */}
      <div className="flex justify-center gap-10 mb-4">
        <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          <Image src="/icons/clip.svg" width={48} height={48} alt="link" />
        </div>
        <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
        </div>
      </div>

      {/* inputs */}
      <div className="flex flex-col gap-4 mx-4">
        <input
          type="text"
          id="linkTitle"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="링크 이름을 입력해주세요."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="linkURL"
          className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="추가하고 싶은 링크를 입력해주세요.(https://google.com)"
          required
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />
      </div>

      {/* submit & clear button */}
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          만들기
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          비우기
        </button>
      </div>
    </section>
  );
};

export default LinkUploadForm;

// const LinkForm = () => {
//   const [title, setTitle] = useState('');
//   const [linkURL, setLinkURL] = useState('');
//   const [imageBlobURL, setImageBlobURL] = useState('');
//   const [image, setImage] = useState<File>();
//   const session = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const upload = useUpload();

//   const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLinkURL(e.target.value);
//   };

//   const { mutateAsync } = useMutation({
//     mutationFn: async () => {
//       if (!image) {
//         const res = await fetch('/api/link', {
//           method: 'POST',
//           body: JSON.stringify({
//             url: linkURL,
//             title: title,
//             userId: session?.user.id,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         return res.json();
//       }

//       const presignedURLResponse = await fetch('/api/presigned-url', {
//         method: 'POST',
//         body: JSON.stringify({
//           name: 'link/' + getCurrentDateTime() + '-' + image.name,
//           type: image.type,
//         }),
//       });
//       const { url: presignedURL } = await presignedURLResponse.json();

//       const uploadResponse = await fetch(presignedURL, {
//         method: 'PUT',
//         body: image,
//         headers: {
//           'Content-type': image.type,
//         },
//       });

//       const res = await fetch('/api/link', {
//         method: 'POST',
//         body: JSON.stringify({
//           url: linkURL,
//           title: title,
//           userId: session?.user.id,
//           image: cloudFrontURL + new URL(presignedURL).pathname,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['links'], { exact: true });
//       setTitle('');
//       setLinkURL('');
//       setImageBlobURL('');
//     },
//   });

//   const onAddLinkClick = async () => {
//     if (!session?.user.id || linkURL === '') {
//       return;
//     }

//     await mutateAsync();
//   };

//   const handleImageUpload = async () => {
//     const image = await upload();

//     if (!image) {
//       return;
//     }

//     const fileSizeMB = image.size / 1024 / 1024;
//     if (fileSizeMB > 4) {
//       return;
//     }

//     setImageBlobURL(URL.createObjectURL(image));
//     setImage(image);
//   };
