import { getServerSession } from 'next-auth';
import { getLinks } from '@linkgraph/db';

import { authOptions } from '~/api/auth/[...nextauth]/route';
import LinkForm from '~/components/LinkForm';
import ProfileImage from '~/components/ProfileImage';
import LinkTable from '~/components/LinkTable';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const links = await getLinks(session?.user.id);

  return (
    <main className="w-full h-full p-4 mx-auto md:p-10 bg-gray-50 max-w-7xl">
      <h1>Profile Page</h1>

      <ProfileImage />
      {/* 유저 닉네임 -> 링크에서 사용 */}
      <LinkForm />
      {links && <LinkTable links={links} />}
    </main>
  );
};

export default Profile;
