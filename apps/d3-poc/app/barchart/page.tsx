'use client';
import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  {
    name: 'foo',
    units: 32,
  },
  {
    name: 'bar',
    units: 67,
  },
  {
    name: 'baz',
    units: 81,
  },
];

const dimensions = {
  width: 600,
  height: 600,
  marginLeft: 100,
  marginBottom: 100,
};

const BarChart: NextPage = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.units)!])
    .range([dimensions.width - dimensions.marginBottom, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width - dimensions.marginLeft])
    .padding(0.1);

  useEffect(() => {
    d3.select(svgRef.current).append('rect').attr('height', 100).attr('width', 100);
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
