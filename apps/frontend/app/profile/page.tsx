'use client';

import { getServerSession } from 'next-auth';
import { getLinks } from '@linkgraph/db';
import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';

import { authOptions } from '~/api/auth/[...nextauth]/route';
import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import LinkTable from '~/components/LinkTable';
import ProfileURL from '~/components/ProfileURL';

const Profile: NextPage = () => {
  // const session = await getServerSession(authOptions);
  // const links = await getLinks(session?.user.id);

  const { data: links } = useQuery(['links'], async () => {
    const res = await fetch('/api/link');
    return await res.json();
  });

  return (
    <main className="mx-auto h-full w-full max-w-7xl bg-gray-50 p-4 md:p-10">
      <ProfileImage />
      <ProfileURL />
      <LinkForm />
      {/* {links && <LinkTable links={links} />} */}
    </main>
  );
};

export default Profile;
