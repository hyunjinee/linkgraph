import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';

import PageLayout from './components/ui/PageLayout';
import { Route, Routes } from 'react-router-dom';
import TestPage from './pages/TestPage';

function App() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0;
          }
        `}
      />
      <PageLayout>
        <Routes>
          <Route path="/" element={<TestPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
