import Image from 'next/image';
import Link from 'next/link';
import prisma from '@linkgraph/db';

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
  // console.log(userCount, linkCount);
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
          <div className=" h-[35rem] w-[21rem] rounded-2xl bg-gray-50 shadow-lg">
            <Image className="mx-auto pt-28" src="/connect.png" width={60} height={60} alt="연결" />

            <div className="flex items-center justify-center mt-10 text-lg font-semibold">
              {userCount}명이
              <br /> 가입했습니다.
            </div>
          </div>
          <div className=" h-[35rem] w-[21rem] rounded-2xl bg-gray-50 shadow-lg">
            <Image className="mx-auto pt-28" src="/connect.png" width={60} height={60} alt="연결" />
            {/* <CountUp end={140293} separator="," /> -> 클라이언트 컴포넌트에서 동작 */}
            <div className="flex items-center justify-center mt-10 text-lg font-semibold">
              {linkCount}개의
              <br /> 링크를 연결합니다.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
