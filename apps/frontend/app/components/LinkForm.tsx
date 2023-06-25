'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface LinkFromProps {}

const LinkForm = () => {
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
        className="rounded border border-slate-400 px-2 py-0.5"
        type="text"
        name="url"
      />
      <button onClick={onClick} className="ml-2 rounded bg-slate-700 px-2 py-1 text-sm text-white">
        Add Link
      </button>
    </>
  );
};

export default LinkForm;
