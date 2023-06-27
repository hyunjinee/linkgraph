'use client';

import type { NextPage } from 'next';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import ProfileURL from '~/components/ProfileURL';
import { useContext, useState } from 'react';
import { AuthContext } from '~/components/Core';
import LinkList from '~/components/LinkList';

// TODO if not logged in -> redirect to homepage

const Profile: NextPage = () => {
  const [URL, setURL] = useState('');
  const queryClient = useQueryClient();
  const session = useContext(AuthContext);
  const { data: links } = useQuery<Link[]>(['links'], async () => {
    const res = await fetch('/api/link');
    return await res.json();
  });

  return (
    <main className="mx-auto h-full w-full max-w-7xl p-4 md:p-10">
      <ProfileImage />
      <ProfileURL />

      <LinkForm />
      <LinkList links={links} />
    </main>
  );
};

export default Profile;
