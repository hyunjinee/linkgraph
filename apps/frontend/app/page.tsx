import { getServerSession } from 'next-auth';
import Image from 'next/image';

import { countLink } from '@linkgraph/db';
import { authOptions } from '~/api/auth/[...nextauth]/route';
import Link from 'next/link';

/* ISR. Incremental Static Regeneration
  
   유저수, 연결된 링크 수를 5분마다 갱신한다.
*/
const Home = async () => {
  const session = await getServerSession(authOptions);
  const count = await countLink(session?.user.id);

  return (
    <main className="flex items-center justify-between w-full h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <section className="flex flex-col justify-center h-full gap-3 shrink-0">
        <div className="text-6xl font-bold ">
          나를 소개하는
          <br /> 링크를 연결해보세요!
        </div>
        <button
          type="button"
          className="inline-flex justify-center w-32 px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Link href="/profile">그래프 만들기</Link>
        </button>
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex gap-5">
          <div className="h-[35rem] w-[21rem] bg-red-500"></div>
          <div className="h-[35rem] w-[21rem] bg-red-500"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
