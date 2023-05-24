import { getSiteInfo } from '@linkgraph/site-info';
import type { NextPage } from 'next';

getSiteInfo();

const Home: NextPage = () => {
  return <main className="flex flex-col items-center justify-between min-h-screen p-24">hi</main>;
};

export default Home;
