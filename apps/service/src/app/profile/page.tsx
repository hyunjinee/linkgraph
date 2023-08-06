import { getServerSession } from 'next-auth';

import { LinkUploadForm, Profile } from '~/components';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import LinkListContent from './components/LinkListContent';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const userId = session.user.id;

  return (
    <main className="w-full h-full p-4 mx-auto max-w-7xl md:p-10">
      <Profile />
      <LinkListContent userId={userId} />

      <div className="lg:flex">
        <LinkUploadForm />
        <div className="mb-4 " />
      </div>
    </main>
  );
};

export default ProfilePage;
