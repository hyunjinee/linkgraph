import { getServerSession } from 'next-auth';

import { LinkUploadForm, Profile, LinkList } from '~/components';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { Suspense } from 'react';
import LinkListSkeleton from '~/components/LinkListSkeleton';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const userId = session.user.id;

  return (
    <main className="w-full h-full p-4 mx-auto max-w-7xl md:p-10">
      <Profile />
      <div className="lg:flex">
        <LinkUploadForm />
        <div className="mb-4 " />

        <Suspense fallback={<LinkListSkeleton />}>
          <LinkList userId={userId} />
        </Suspense>
      </div>
    </main>
  );
};

export default ProfilePage;
