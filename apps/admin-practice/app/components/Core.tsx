'use client';

import { ConfigProvider } from 'antd';
import type { PropsWithChildren } from 'react';

const Core = ({ children }: any) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#63489a',
          colorLink: '#63489a',
          colorLinkHover: '#7f68a6',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default Core;
