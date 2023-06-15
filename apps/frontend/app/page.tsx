import { getServerSession } from 'next-auth';
import Image from 'next/image';

import { countLink } from '@linkgraph/db';
import { authOptions } from '~/api/auth/[...nextauth]/route';
import Link from 'next/link';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const count = await countLink(session?.user.id);
  console.log(count);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center p-24">
      <section className="flex flex-col items-center">
        {/* Logo */}
        <div className="w-200px h-200px relative">
          <Image src="/linkgraph.svg" alt="hi" priority width={200} height={200} />
        </div>

        <br />
        {/* 임시 영역 */}
        <h1 className="font-bold text-purple-400 ">서비스 준비중입니다.</h1>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Link href="/graph">그래프 컨셉 구경하기</Link>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
