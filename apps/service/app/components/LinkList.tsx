'use client';

import React from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '~/hooks/useAuth';
import { useLink } from '~/queries/link';

const LinkList = () => {
  const session = useAuth();
  const { links } = useLink(session?.user.id);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/link?id=' + id, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['links'], { exact: true });
    },
  });

  return (
    <section className="w-full lg:w-1/2">
      <h2 className="mb-4 text-xl font-semibold">링크 목록</h2>
      <ul className="w-ful">
        {links?.map((link: Link) => (
          <li key={link.id} className="flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center justify-center bg-red-50 rounded-full overflow-hidden">
              <Image className="object-cover" src={link.image || '/profile.png'} alt="링크" width={80} height={80} />
            </div>
            <div>{link.title}</div>
            <div>{link.url}</div>
            <button
              onClick={() => {
                mutateAsync(link.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default React.memo(LinkList);

// import Image from 'next/image';

// const LinkUploadForm = () => {
//   return (
//     <div className="w-full lg:w-1/2">
//       <h3 className="mb-4 text-xl font-semibold">링크 업로드</h3>
//       {/* link images, colors */}
//       <div className="flex justify-center gap-10 mb-4">
//         <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
//           <Image src="/icons/clip.svg" width={48} height={48} alt="link" />
//         </div>
//         <div className="flex items-center justify-center w-24 h-24 rounded-full shrink-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
//           <Image src="/icons/palette.svg" width={48} height={48} alt="palette" />
//         </div>
//       </div>
//       {/* inputs */}
//       <div className="flex flex-col gap-4 mx-4">
//         <input
//           type="text"
//           id="linkTitle"
//           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           placeholder="링크 이름을 입력해주세요."
//           required
//           // value={title}
//           // onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           id="linkURL"
//           className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//           placeholder="추가하고 싶은 링크를 입력해주세요.(https://google.com)"
//           required
//           // value={linkURL}
//           // onChange={onChangeURL}
//         />
//       </div>

//       <div className="flex justify-center gap-4">
//         <button
//           type="button"
//           className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//         >
//           만들기
//         </button>
//         <button
//           type="button"
//           className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//         >
//           비우기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LinkUploadForm;
