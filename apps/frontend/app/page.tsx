'use client';

import { getSiteInfo } from '@linkgraph/site-info';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

getSiteInfo();

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <section>
        <div>
          <Image src="/linkgraph.svg" alt="hi" width="200" height="200" />
        </div>

        <br />

        <h1 className="font-bold text-center">서비스 준비중입니다.</h1>
      </section>
    </main>
  );
};

export default Home;
