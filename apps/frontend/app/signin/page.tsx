'use client';

import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import GoogleSignInButton from '~/components/GoogleSignInButton';

const SignInPage: NextPage = () => {
  // const { data: session } = useSession();

  // console.log(session);

  // if (session) {
  //   return (
  //     <div>
  //       로그인 되었습니다.
  //       <button onClick={() => signOut()}>로그아웃</button>
  //     </div>
  //   );
  // }

  return (
    <section>
      <button>구글로 로그인</button>
      <GoogleSignInButton />

      <button onClick={() => signIn('kakao')}>카카오로 로그인</button>
    </section>
  );
};

export default SignInPage;
