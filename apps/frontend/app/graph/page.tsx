'use client';

import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { nodes, links, MANY_BODY_STRENGTH } from '~/data/forcegraph';

const centerX = 1000 / 2;
const centerY = 1000 / 2;

const Graph: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const simulation = d3
      .forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
      .force(
        'link',
        d3.forceLink(links).distance((link: any) => link.distance),
      )
      .force('center', d3.forceCenter(svgRef.current.width.baseVal.value / 2, svgRef.current.height.baseVal.value / 2));

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
      .text((node: any) => node.id)
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
      <div className="h-full w-full bg-red-200">
        <svg ref={svgRef} className="h-full w-full" />
      </div>
    </>
  );
};

export default Graph;
