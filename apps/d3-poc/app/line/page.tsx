'use client';
import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Test: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    // d3.select('body').append('div').style('border', '1px black solid').html('hi');
    // d3.selectAll('div')
    //   .style('background-color', 'pink')
    //   .style('font-size', '24px')
    //   .attr('id', 'newDiv')
    //   .attr('class', 'd3div')
    //   .on('click', () => console.log('hi'));

    d3.select('svg')
      .append('line')
      .attr('x1', 20)
      .attr('y1', 20)
      .attr('x2', 400)
      .attr('y2', 400)
      .style('stroke', 'black')
      .style('stroke-width', 2);

    d3.select('svg').append('text').attr('x', 20).attr('y', 20).text('hello');
    d3.select('svg').append('circle').attr('r', 20).attr('cx', 20).attr('cy', 20).style('fill', 'red');
    d3.select('svg').append('circle').attr('r', 100).attr('cx', 400).attr('cy', 400).style('fill', 'lightblue');
    d3.select('svg').append('text').attr('x', 400).attr('y', 400).text('world');
  }, []);
  // return null;
  return (
    <>
      <svg ref={svgRef} className="bg-gray-200 w-[500px] h-[500px] order-blue-100 border-4 border-blue-200" />
    </>
  );
};

export default Test;
