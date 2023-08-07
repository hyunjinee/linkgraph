'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Button from './Button';

export default function KakaoSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button className="w-full" onClick={() => signIn('kakao', { callbackUrl: callbackUrl ? callbackUrl : undefined })}>
      Continue with Kakao
    </Button>
  );
}
