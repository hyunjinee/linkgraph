'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { useAuth } from '../hooks/useAuth';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useUpload } from '../hooks/useUpload';
import { useCreateLink } from '../queries/link';

const LinkUploadForm = () => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [imageBlobURL, setImageBlobURL] = useState('');
  const [color, setColor] = useState('');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const [file, setFile, upload] = useUpload();
  const session = useAuth();
  const { createLink } = useCreateLink(session?.user.id);

  useOnClickOutside(paletteRef, () => setIsPaletteOpen(false));

  const handleClear = () => {
    setLinkTitle('');
    setLinkURL('');
    setImageBlobURL('');
    setColor('');
    setFile(null);
  };

  const handleImageUpload = async () => {
    const image = await upload();
    if (!image) {
      return;
    }

    const fileSizeMB = image.size / 1024 / 1024;
    if (fileSizeMB > 4) {
      return;
    }

    setImageBlobURL(URL.createObjectURL(image));
  };

  const handleLinkUpload = async () => {
    await createLink({
      title: linkTitle,
      url: linkURL,
      image: file,
      color,
    });

    handleClear();
  };

  return (
    <section className="w-full lg:w-1/2">
      {/* title */}
      <h2 className="mb-4 text-xl font-semibold">링크 업로드</h2>

      {/* link images, colors */}
      <div className="flex justify-center gap-10 mb-4">
        <div
          onClick={handleImageUpload}
          className="relative flex items-center justify-center w-24 h-24 overflow-hidden rounded-full cursor-pointer relatvie shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
        >
          {imageBlobURL ? (
            <Image src={imageBlobURL} alt="link image" fill />
          ) : (
            <Image src={'/icons/clip.svg'} alt="link" width={48} height={48} />
          )}
        </div>
        <div
          onClick={() => setIsPaletteOpen(true)}
          className={`relative flex items-center justify-center w-24 h-24 rounded-full cursor-pointer shrink-0 ${
            !color && 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'
          }`}
          style={{ backgroundColor: color }}
        >
          {!color && <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />}
          {isPaletteOpen && (
            <div ref={paletteRef} className="absolute" style={{ top: '-200px' }}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
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
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
        />
        <input
          type="text"
          id="linkURL"
          className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="추가하고 싶은 링크를 입력해주세요.(https://google.com)"
          required
          value={linkURL}
          onChange={(e) => setLinkURL(e.target.value)}
        />

        {/* <input type="color" /> */}
      </div>

      {/* submit & clear button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLinkUpload}
          type="button"
          className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          만들기
        </button>
        <button
          onClick={handleClear}
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
