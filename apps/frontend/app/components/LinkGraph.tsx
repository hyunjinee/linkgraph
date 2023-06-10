'use client';

// import type { Link } from '@prisma/client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import type { Link, Node } from '~/data/linkgraph';
import { MANY_BODY_STRENGTH, nodes, links } from '~/data/linkgraph';

interface LinkGraphProps {
  links: any;
  // links: Link[];
  // links: Link[];
}

const LinkGraph: React.FC<LinkGraphProps> = ({}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // const mainNode = { id: 'userID가 여기로 와야함.', size: 40 };
  // TODO: Put User ID to main Node

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    const svg = d3.select(svgRef.current);

    const simulation = d3
      .forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
      .force(
        'link',
        d3.forceLink(links).distance((link: any) => link.distance),
      )
      .force('center', d3.forceCenter(svgRef.current.width.baseVal.value / 2, svgRef.current.height.baseVal.value / 2));
    // .force('center', d3.forceCenter(+svg.attr('width') / 2, +svg.attr('height') / 2));
    const dragInteraction = d3.drag().on('drag', (event, node: any) => {
      node.fx = event.x;
      node.fy = event.y;

      simulation.alpha(1);
      simulation.restart();
    });
    const lines = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (link: any) => link.color || 'black');
    const circles = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', (node: any) => node.size)
      .attr('fill', (node: any) => node.color || 'grey')
      .call(dragInteraction as any);
    const text = svg
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('pointer-events', 'none')
      .text((node: any) => node.id);

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

  return <svg ref={svgRef} className="h-full w-full bg-red-50" />;
};

export default LinkGraph;
