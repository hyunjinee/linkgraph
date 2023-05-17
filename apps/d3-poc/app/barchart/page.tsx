'use client';
import { NextPage } from 'next';
import { Suspense, useEffect, useRef } from 'react';
import { select } from 'd3';

const BarChart: NextPage = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    select(svgRef.current).append('rect').attr('height', 100).attr('width', 100);
    console.log(select(svgRef.current));
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
