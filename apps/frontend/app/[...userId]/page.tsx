import { NextPage } from 'next';

const User: NextPage<{ params: { userId: string } }> = ({ params }) => {
  console.log(params.userId);

  return <div>hi</div>;
};

export default User;
