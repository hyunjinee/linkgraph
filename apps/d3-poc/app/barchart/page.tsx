'use client';
import { NextPage } from 'next';
import { Suspense, useEffect, useRef } from 'react';
import { select } from 'd3';

const BarChart: NextPage = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    select(svgRef.current).append('rect');
    console.log(select(svgRef.current));
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

export default BarChart;
