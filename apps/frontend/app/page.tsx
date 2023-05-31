'use client';
import { getSiteInfo } from '@linkgraph/site-info';
import type { NextPage } from 'next';
import GoogleSignInButton from './components/GoogleSignInButton';
import { useSession } from 'next-auth/react';

getSiteInfo();

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <section>
        <button>구글로 로그인</button>
        <GoogleSignInButton />
      </section>
    </main>
  );
};

export default Home;
