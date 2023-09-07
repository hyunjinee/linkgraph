import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Home.scss';
import styled from '@emotion/styled';
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
  return (
    <div className="home">
      <Sidebar />

      <HomeContainer>
        <Navbar />
        <div className="widgets"></div>
      </HomeContainer>

      <div className="charts"></div>
    </div>
  );
}

const HomeContainer = styled.div`
  flex: 6;
  background-color: #f7f7f7;
`;
