import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

/*
  Graph Page
  서버에서 데이터 페칭 후 그래프 컴포넌트에게 데이터 전달. 그래프 컴포넌트는 클라이언트 컴포넌트
*/
const Graph = async ({ params }: { params: { userId: string[] } }) => {
  const userId = params.userId[0];
  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // if (true) {
  //   notFound();
  // }

  return (
    <div>
      {/* {JSON.stringify(user, null, 2)} */}
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* {JSON.stringify(links, null, 2)} */}
    </div>
  );
};

export default Graph;
