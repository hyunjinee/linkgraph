'use client';

import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';

import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import ProfileURL from '~/components/ProfileURL';
import LinkList from '~/components/LinkList';

// TODO if not logged in -> redirect to homepage

const Profile: NextPage = () => {
  const { data: links } = useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: async () => {
      const res = await fetch('/api/link');
      return res.json();
    },
    suspense: true,
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
