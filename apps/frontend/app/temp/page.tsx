import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import GoogleSignInButton from '~/components/GoogleSignInButton';
import Search from '~/components/Search';

const Temp: NextPage = () => {
  return (
    <div>
      <button>구글로 로그인</button>
      <GoogleSignInButton />

      <br />

      <Link href="/image-upload">프로필 이미지 업로드</Link>
      {/* 
      <Image
        src="https://d1wdpf820bqp3t.cloudfront.net/%E1%84%80%E1%85%B5%E1%86%BA%E1%84%92%E1%85%A5%E1%84%87%E1%85%AE%E1%86%BC.jpg"
        width={200}
        height={200}
        alt="hi"
      /> */}

      <Search />
    </div>
  );
};

export default Temp;
