import React from 'react';
import './Home.scss';
import TopBox from '../../components/TopBox/TopBox';
import ChartBox from '../../components/ChartBox/ChartBox';
import { chartBoxUser } from '../../data';

export default function Home() {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">Box3</div>
      <div className="box box4">Box4</div>
      <div className="box box5">Box5</div>
      <div className="box box6">Box6</div>
      <div className="box box7">Box7</div>
      <div className="box box8">Box8</div>
      <div className="box box9">Box9</div>
    </div>
  );
}
