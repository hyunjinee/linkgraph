import { getServerSession } from 'next-auth';

import { LinkUploadForm, Profile, LinkList } from '~/components';
import { authOptions } from '~/api/auth/[...nextauth]/route';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <main className="w-full h-full p-4 mx-auto max-w-7xl md:p-10">
      <Profile />

      <div className="lg:flex">
        <LinkUploadForm />

        <div className="mb-4 " />

        <LinkList />
      </div>
    </main>
  );
};

export default ProfilePage;
