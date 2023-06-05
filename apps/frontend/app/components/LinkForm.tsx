'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { createLinkAction } from '~/_action';

interface LinkFromProps {}

const LinkForm: React.FC = () => {
  const [URL, setURL] = useState('');
  const { data: session } = useSession();

  // TODO if not logged in -> redirect to homepage

  const onClick = async () => {
    if (!session?.user.id || URL === '') {
      return;
    }

    const res = await fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({
        url: URL,
        userId: session.user.id,
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
    </>
  );
};

export default LinkForm;
