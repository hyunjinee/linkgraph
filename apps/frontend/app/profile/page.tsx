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
    <main className="mx-auto h-full w-full max-w-7xl bg-gray-50 p-4 md:p-10">
      <h1>Profile Page</h1>

      <ProfileImage />
      <LinkForm />
      {links && <LinkTable links={links} />}
    </main>
  );
};

export default Profile;
