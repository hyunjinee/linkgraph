import { css } from '@emotion/react';
import { type PropsWithChildren } from 'react';

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div
      css={css`
        max-width: 650px;
        height: 100vh;
        width: 100%;
        padding: 0 4%;
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  );
}
