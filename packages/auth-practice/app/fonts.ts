import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Thin.subset.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraLight.subset.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Light.subset.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Black.subset.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});
