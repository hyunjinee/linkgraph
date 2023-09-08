import Sidebar from '../../components/Sidebar/Sidebar';

import './Home.scss';
import styled from '@emotion/styled';
import Navbar from '../../components/Navbar/Navbar';
import Chart from '../../components/Chart/Chart';
import Featured from '../../components/Featured/Featured';

export default function Home() {
  return (
    <div className="home">
      <Sidebar />

      <HomeContainer>
        <Navbar />
        <div className="widgets"></div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </HomeContainer>
    </div>
  );
}

const HomeContainer = styled.div`
  flex: 6;
  background-color: #f7f7f7;
`;
