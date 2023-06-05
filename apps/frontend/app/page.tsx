// 'use client';

import { countLink } from '@linkgraph/db';
import { getSiteInfo } from '@linkgraph/site-info';
import type { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';
// import { useSession } from 'next-auth/react';

getSiteInfo();

const Home = async () => {
  const session = await getServerSession(authOptions);
  const count = await countLink(session?.user.id);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <section>
        <div className="relative w-200px h-200px">
          <Image src="/linkgraph.svg" alt="hi" priority width={200} height={200} />
        </div>

        <br />

        <h1 className="font-bold text-center">서비스 준비중입니다.</h1>
      </section>
    </main>
  );
};

export default Home;
