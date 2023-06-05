import { getLinks } from '@linkgraph/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/api/auth/[...nextauth]/route';
import LinkForm from '~/components/LinkForm';

const Setting = async () => {
  const session = await getServerSession(authOptions);
  const links = await getLinks(session?.user.id);
  //

  console.log(links);
  return (
    <>
      <LinkForm />

      <br />
      <br />
      <br />
      <div>{JSON.stringify(links, null, 2)}</div>
    </>
  );
};

export default Setting;
