'use client';

import { select } from 'd3';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([20, 30, 45, 70, 26]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = select(svgRef.current);

    svg
      .selectAll('circle')
      .data(data)
      .join(
        (enter) => enter.append('circle'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove(),
      )
      .attr('r', (value) => value)
      .attr('cx', (value) => value * 2)
      .attr('cy', (value) => value * 2)
      .attr('stroke', 'red');
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-red-100">
      <span>hdi</span>

      <svg ref={svgRef}></svg>
      <button
        onClick={() => {
          setData(data.map((el) => el + 5));
        }}
      >
        increase + 5
      </button>
      <button
        onClick={() => {
          setData(data.filter((el) => el > 35));
        }}
      >
        filter circle r should gt 35
      </button>
    </main>
  );
}
