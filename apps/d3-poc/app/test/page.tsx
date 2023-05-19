'use client';
import { NextPage } from 'next';
import { useEffect } from 'react';
import * as d3 from 'd3';

const Test: NextPage = () => {
  useEffect(() => {
    d3.select('body').append('div').style('border', '1px black solid').html('hi');
    d3.selectAll('div')
      .style('background-color', 'pink')
      .style('font-size', '24px')
      .attr('id', 'newDiv')
      .attr('class', 'd3div')
      .on('click', () => console.log('hi'));
  }, []);

  return <div>안녕하세요.</div>;
};

export default Test;
