'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { createLinkAction } from '~/_action';

const LinkForm: React.FC = () => {
  const [URL, setURL] = useState('');
  const { data } = useSession();

  console.log(data);

  // TODO user없으면 로그인 시켜야함

  // const action = async (data: FormData) => {
  //   const url = data.get('url');

  //   if (!url || typeof url !== 'string') {
  //     return;
  //   }

  //   await createLinkAction(url);
  // };

  const onClick = async () => {
    const res = await fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({
        url: URL,
      }),
    });

    const data = await res.json();

    console.log(data);
  };

  const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  return (
    <>
      {/* <form action={action}> */}
      <h2 className="mb-2 font-medium">Create New Link</h2>
      <input
        value={URL}
        onChange={onChangeURL}
        className="border rounded border-slate-400 px-2 py-0.5"
        type="text"
        name="url"
      />
      <button onClick={onClick} className="px-2 py-1 ml-2 text-sm text-white rounded bg-slate-700">
        Add Link
      </button>
      {/* </form> */}
    </>
  );
};

export default LinkForm;
