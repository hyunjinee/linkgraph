'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ProfileURL = () => {
  const [profileURL, setProfileURL] = useState('');
  const { data: session } = useSession();

  const a = useQuery(['profileURL'], () => {});

  const userId = session?.user.id;
  console.log(session, 'profileURL');

  return (
    <div>
      ProfileURL
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" value={profileURL} onChange={(e) => setProfileURL(e.target.value)} />
      </form>
    </div>
  );
};

export default ProfileURL;
