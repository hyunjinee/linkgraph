import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';
import Toggle from './components/Toggle/Toggle';
import PageLayout from './components/PageLayout/PageLayout';

function App() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <PageLayout>hu</PageLayout>
    </>
  );
}

export default App;
