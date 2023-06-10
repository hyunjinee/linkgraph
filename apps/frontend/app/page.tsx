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
        <div className="w-200px h-200px relative">
          <Image src="/linkgraph.svg" alt="hi" priority width={200} height={200} />
        </div>

        <br />

        <h1 className="font-bold text-purple-400 ">서비스 준비중입니다.</h1>
        <Link href="/graph" className="text-purple-500">
          그래프 컨셉 구경하기
        </Link>
      </section>
    </main>
  );
};

export default Home;
