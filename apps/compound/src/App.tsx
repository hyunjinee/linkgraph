import { css } from '@emotion/react';
import './App.css';
import Counter from './components/Counter';

function App() {
  return (
    <>
      <Counter>
        <Counter.Monitor />
        <div
          css={css`
            display: flex;
            flex-direction: column;

            margin-bottom: 1rem;
          `}
        >
          <Counter.Up amount={3} />
          <Counter.Down amount={1} />
        </div>
      </Counter>
    </>
  );
}

export default App;
