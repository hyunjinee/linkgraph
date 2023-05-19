'use client';

import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = {
  nodes: [
    {
      id: 1,
      name: 'Andy',
      gender: 'male',
    },
    {
      id: 2,
      name: 'Betty',
      gender: 'female',
    },
    {
      id: 3,
      name: 'Cate',
      gender: 'female',
    },
    {
      id: 4,
      name: 'Dave',
      gender: 'male',
    },
    {
      id: 5,
      name: 'Ellen',
      gender: 'female',
    },
    {
      id: 6,
      name: 'Fiona',
      gender: 'female',
    },
    {
      id: 7,
      name: 'Garry',
      gender: 'male',
    },
    {
      id: 8,
      name: 'Holly',
      gender: 'female',
    },
    {
      id: 9,
      name: 'Iris',
      gender: 'female',
    },
    {
      id: 10,
      name: 'Jane',
      gender: 'female',
    },
  ],
  links: [
    {
      source: 1,
      target: 2,
    },
    {
      source: 1,
      target: 5,
    },
    {
      source: 1,
      target: 6,
    },

    {
      source: 2,
      target: 3,
    },
    {
      source: 2,
      target: 7,
    },
    {
      source: 3,
      target: 4,
    },
    {
      source: 8,
      target: 3,
    },
    {
      source: 4,
      target: 5,
    },
    {
      source: 4,
      target: 9,
    },
    {
      source: 5,
      target: 10,
    },
  ],
};

const runForceGraph = (container: any, linksData: any, nodesData: any, nodeHoverTooltip: any) => {
  const links = linksData.map((d: any) => Object.assign({}, d));
  const nodes = nodesData.map((d: any) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const color = () => {
    return '#9d79a0';
  };

  const icon = (d: any) => {
    return d.gender === 'male' ? '\uf222' : '\uf221';
  };
  const drag = (simulation: any) => {
    const dragstarted = (d: any) => {
      // if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    };
  };
};

const ForceGraph: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let distroyFn;

    if (containerRef.current) {
      runForceGraph(containerRef.current, data.links, data.nodes, null);
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default ForceGraph;
