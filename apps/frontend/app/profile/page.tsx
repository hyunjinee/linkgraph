'use client';

import type { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { getLinks } from '@linkgraph/db';
import { useQuery } from '@tanstack/react-query';

import { authOptions } from '~/api/auth/[...nextauth]/route';
import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import LinkTable from '~/components/LinkTable';
import ProfileURL from '~/components/ProfileURL';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useContext, useState } from 'react';
import { AuthContext } from '~/components/Core';

const Profile: NextPage = () => {
  const [URL, setURL] = useState('');
  // const session = await getServerSession(authOptions);
  // const links = await getLinks(session?.user.id);

  const { data: links } = useQuery(['links'], async () => {
    const res = await fetch('/api/link');
    return await res.json();
  });

  const session = useContext(AuthContext);

  const onAddURLClick = async () => {
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

  return (
    <main className="mx-auto h-full w-full max-w-7xl p-4 md:p-10">
      <ProfileImage />
      <ProfileURL />
      <LinkForm />
      {/* {links && <LinkTable links={links} />} */}

      <div className="flex flex-col">
        <input type="text" />
        <Input placeholder="Username" value={URL} onChange={(e) => setURL(e.target.value)} />
        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={onAddURLClick}>
          URL 추가하기
        </Button>
      </div>

      <ul>
        {links?.map((link: any, index: number) => (
          <li key={index}>{link.id}</li>
        ))}
      </ul>
    </main>
  );
};

export default Profile;
