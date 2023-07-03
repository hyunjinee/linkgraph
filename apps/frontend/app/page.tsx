import Image from 'next/image';
import Link from 'next/link';
import prisma from '@linkgraph/db';

import CountUp from '~/components/CountUp';

/* ISR. Incremental Static Regeneration
  
   유저수, 연결된 링크 수를 5분마다 갱신한다.
*/
export const revalidate = 60 * 5;
const getStatistics = async () => {
  const [userCount, linkCount] = await Promise.all([prisma.user.count(), prisma.link.count()]);

  return {
    userCount,
    linkCount,
  };
};

const Home = async () => {
  const { userCount, linkCount } = await getStatistics();

  return (
    <main className="mx-auto h-full w-full max-w-7xl">
      <section className="mt-8 grid grid-cols-1 px-8 md:grid-cols-2 lg:mt-24">
        <div className="mb-12 md:mb-0 lg:mt-24">
          <h1 className="mt-10 text-5xl font-bold sm:mt-0 sm:text-6xl">
            나를 소개하는
            <br /> 링크를 연결해보세요!
          </h1>
          <p>프로필 페이지에서 나를 소개하는 링크를 생성하면 그래프 형태로 보여집니다.</p>
          <button
            type="button"
            className="mt-4 inline-flex w-32 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Link href="/profile">그래프 만들기</Link>
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
          <Image src="linkgraph.svg" width={300} height={300} alt="temp" />
        </div>
      </section>

      <section className="mt-32 flex items-center justify-center">
        <h2 className="text-xl font-semibold ">
          <CountUp number={userCount} className="text-3xl text-pink-500" />
          <span className="text-pink-500">명</span>의 유저가{' '}
          <CountUp number={linkCount} className="text-3xl text-sky-500" />
          <span className="text-sky-500">개</span>의 링크를 연결하고 있습니다.
        </h2>
      </section>

      {/* <section className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex gap-5">
          <div className=" h-[35rem] w-[21rem] rounded-2xl bg-gray-50 shadow-lg">
            <Image className="mx-auto pt-28" src="/connect.png" width={60} height={60} alt="연결" />

            <div className="flex items-center justify-center mt-10 text-lg font-semibold">
              {userCount}명이
              <br /> 가입했습니다.
            </div>
          </div>
          <div className=" h-[35rem] w-[21rem] rounded-2xl bg-gray-50 shadow-lg">
            <Image className="mx-auto pt-28" src="/connect.png" width={60} height={60} alt="연결" />
           
            <div className="flex items-center justify-center mt-10 text-lg font-semibold">
              {linkCount}개의
              <br /> 링크를 연결합니다.
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Home;
