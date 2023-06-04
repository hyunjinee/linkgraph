import { NextPage } from 'next';
import Link from 'next/link';

import GoogleSignInButton from '~/components/GoogleSignInButton';

const Temp: NextPage = () => {
  return (
    <div>
      <button>구글로 로그인</button>
      <GoogleSignInButton />

      <br />

      <Link href="/image-upload">프로필 이미지 업로드</Link>
      <Link href="/image-upload">프로필 이미지 업로드</Link>
      <Link href="/image-upload">프로필 이미지 업로드</Link>
      <Link href="/image-upload">프로필 이미지 업로드</Link>
    </div>
  );
};

export default Temp;
