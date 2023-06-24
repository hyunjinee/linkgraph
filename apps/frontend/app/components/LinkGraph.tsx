'use client';

// import type { Link } from '@prisma/client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import type { Link, Node } from '~/data/linkgraph';
import { MANY_BODY_STRENGTH } from '~/data/linkgraph';

interface LinkGraphProps {
  links: any;
  // links: Link[];
  // links: Link[];
}

const LinkGraph = ({ links: userLinks }: LinkGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // const mainNode = { id: 'userID가 여기로 와야함.', size: 40 };
  // TODO: Put User ID to main Node

  const nodes: d3.SimulationNodeDatum[] = [];
  // const links: d3.SimulationLinkDatum<d3.SimulationNodeDatum>[] = [];
  const links: any = [];
  console.log(nodes);
  console.log(links);

  const MAIN_NODE_SIZE = 40;
  const CHILD_NODE_SIZE = 15;
  const LEAF_NODE_SIZE = 5;
  const DEFAULT_DISTANCE = 20;
  const MAIN_NODE_DISTANCE = 90;
  const LEAF_NODE_DISTANCE = 30;

  let i = 0;

  const addMainNode = (node: Node) => {
    node.size = MAIN_NODE_SIZE;
    node.color = colors[i++][1];
    nodes.push(node);
  };

  const addChildNode = (
    parentNode: Node,
    childNode: Node,
    size: number = CHILD_NODE_SIZE,
    distance: number = DEFAULT_DISTANCE,
  ) => {
    childNode.size = size;
    childNode.color = parentNode.color;

    nodes.push(childNode);
    links.push({ source: parentNode, target: childNode, distance, color: parentNode.color });
  };

  const assembleChildNode = (parentNode: any, id: any, numLeaves: number = 20) => {
    const childNode = { id };
    addChildNode(parentNode, childNode);

    for (let i = 0; i < numLeaves; i++) {
      addChildNode(childNode, { id: '' }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
    }
  };

  const connectMainNodes = (source: any, target: any) => {
    links.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE,
      color: source.color,
    });
  };

  const mainNode = { id: 'hyunjin' };
  addMainNode(mainNode);

  userLinks.forEach((userLink: any) => {
    addChildNode(mainNode, { id: userLink.url });
  });

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

  return <svg ref={svgRef} className="w-full h-full bg-red-50" />;
};

export default LinkGraph;

const colors = [
  ['#9D4452', '#E6A6B0', '#BE6B78', '#812836', '#5B0D1A'],
  ['#A76C48', '#F4CAAF', '#C99372', '#884E2A', '#602E0E'],
  ['#2E6B5E', '#719D93', '#498175', '#1B584A', '#093E32'],
  ['#538E3D', '#A6D096', '#75AC61', '#3A7424', '#1F520C'],
];

// const artsWeb = { id: 'Arts Web' };
// addMainNode(artsWeb);
// assembleChildNode(artsWeb, 'Community Vision');
// assembleChildNode(artsWeb, 'Silicon Valley Creates');

// const socialImpactCommons = { id: 'Social Impact Commons' };
// addMainNode(socialImpactCommons);
// assembleChildNode(socialImpactCommons, 'Theatre Bay Area');
// assembleChildNode(socialImpactCommons, 'EastSide Arts Alliance');
// assembleChildNode(socialImpactCommons, 'Local Color');

// const cast = { id: 'Community Arts Stabilization Trust' };
// addMainNode(cast);
// assembleChildNode(cast, 'CounterPulse');
// assembleChildNode(cast, 'Luggage Store Gallery');
// assembleChildNode(cast, 'Performing Arts Workshop');
// assembleChildNode(cast, '447 Minna St.', 5);
// assembleChildNode(cast, 'Keeping Space Oakland');

// const ambitioUS = { id: 'AmbitioUS' };
// addMainNode(ambitioUS);
// assembleChildNode(ambitioUS, 'EBPREC');
// assembleChildNode(ambitioUS, 'SELC', 3);
// assembleChildNode(ambitioUS, 'The Runway Project', 3);
// assembleChildNode(ambitioUS, 'Common Future', 3);
// assembleChildNode(ambitioUS, 'Freelancers Union', 3);
// assembleChildNode(ambitioUS, 'US Federation of Worker Cooperatives', 3);

// connectMainNodes(artsWeb, socialImpactCommons);
// connectMainNodes(artsWeb, cast);
// connectMainNodes(socialImpactCommons, cast);
// connectMainNodes(ambitioUS, cast);
// connectMainNodes(ambitioUS, socialImpactCommons);
// connectMainNodes(ambitioUS, artsWeb);
