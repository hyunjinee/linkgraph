import { select } from 'd3';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([20, 30, 45, 70, 26]);
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = select(svgRef.current);

    svg
      .selectAll('circle')
      .data(data)
      .join((enter) => enter.append('circle'));
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-red-100">
      <span>hdi</span>

      <svg ref={svgRef}></svg>
    </main>
  );
}
