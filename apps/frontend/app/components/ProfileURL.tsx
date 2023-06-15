'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ProfileURL = () => {
  const [URL, setURL] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();

  // const a = useQuery(['profileURL'], () => {});

  const userId = session?.user.id;
  // console.log(session, 'profileURL');

  console.log(isEditMode);

  return (
    <div className="flex">
      ProfileURL
      <button
        onClick={() => setIsEditMode((prev) => !prev)}
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        수정
      </button>
      {isEditMode ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsEditMode(false);

            const res = await fetch('/api/url', {
              method: 'PATCH',
              body: JSON.stringify({
                url: URL,
                userId,
              }),
            });

            const data = await res.json();

            console.log(data);
          }}
        >
          <input type="text" value={URL} onChange={(e) => setURL(e.target.value)} />
          <button type="submit">제출</button>
        </form>
      ) : (
        <div>{session?.user.id}</div>
      )}
    </div>
  );
};

export default ProfileURL;
