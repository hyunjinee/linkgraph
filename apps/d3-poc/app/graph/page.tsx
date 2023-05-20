'use client';

import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { nodes, links } from '~/data/forcegraph';

const centerX = 960 / 2;
const centerY = 500 / 2;

const Graph: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('link', d3.forceLink(links))
      .force('center', d3.forceCenter(centerX, centerY));

    const svg = d3.select(svgRef.current);
    const circles = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', (node: any) => node.size)
      .attr('fill', 'grey');
    const text = svg
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((node) => node.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle');

    const lines = svg.selectAll('line').data(links).enter().append('line').attr('stroke', 'black');

    simulation.on('tick', () => {
      circles.attr('cx', (node: any) => node.x);
      circles.attr('cy', (node: any) => node.y);

      text.attr('x', (node: any) => node.x).attr('y', (node: any) => node.y);

      lines
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });
  }, []);
  return (
    <>
      <svg ref={svgRef} className="w-[960px] h-[500px] bg-red-200" />
    </>
  );
};

export default Graph;
