'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 400;

const margin = {
  top: 30,
  right: 80,
  bottom: 30,
  left: 30,
};

const dataset = {
  nodes: [
    {
      id: 'hyunjin',
      // img: './vercel.svg',
      size: 50,
    },
    {
      id: 'hyunjin2',
      img: 'https://github.com/favicon.ico',
      size: 50,
    },
  ],
  links: [
    {
      source: 'hyunjin',
      target: 'hyunjin2',
    },
  ],
};

type GraphProps = {
  links: any;
  nodes: any;
};

const Graph = ({ nodes, links }: GraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  console.log(nodes, links);

  useEffect(() => {
    const simulation = d3
      .forceSimulation(dataset.nodes as any)
      .force(
        'link',
        d3
          .forceLink(dataset.links)
          .id((d: any) => d.id)
          .distance(() => 100),
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(containerRef.current).append('svg').attr('width', width).attr('height', height);

    const linkGroup = svg.append('g').attr('id', 'links');
    const nodeGroup = svg.append('g').attr('id', 'nodes');

    const nodeList = nodeGroup.selectAll('g').data(dataset.nodes).join('g');

    nodeList.each(function (d) {
      if (d.img) {
        d3.select(this as any)
          .append('image')
          .attr('xlink:href', d.img)
          .attr('width', 60)
          .attr('height', 60)
          .attr('class', 'node');
      } else {
        d3.select(this).append('circle').attr('r', 20).attr('class', 'node');
      }

      // .attr('r', 20)
      // .attr('opacity', 0.5)
      // // .attr('fill', 'transparent')
      // .append('image')
      // .attr('xlink:href', d.img)
      // .attr('width', 60)
      // .attr('height', 60);
    });
    const link = linkGroup
      .selectAll('line')
      .data(dataset.links)
      .join('line')
      .style('stroke-width', 2.5)
      .attr('stroke', (link: any) => link.color || 'black');

    const node = nodeList.selectAll('.node');

    // const node = nodeList.selectAll('circle').join('circle');

    // const circles = svg
    // .selectAll('circle')
    // .data(nodes)
    // .enter()
    // .append('circle')
    // .attr('r', (node: any) => node.size)
    // .attr('fill', (node: any) => node.color || 'grey')
    // .call(dragInteraction as any);
    console.log(node);
    console.log(link);

    // const link = svg
    //   .append('g')
    //   .attr('class', 'links')
    //   .selectAll('line')
    //   .data(dataset.links)
    //   .enter()
    //   .append('line')
    //   .style('stroke-width', 2.5)
    //   .attr('stroke', (link: any) => link.color || 'black');
    // const node = svg
    //   .append('g')
    //   .attr('class', 'nodes')
    //   .selectAll('image')
    //   .data(dataset.nodes)
    //   .enter()
    //   .append('image')
    //   .attr('xlink:href', function (d) {
    //     return d.img;
    //   })
    //   .attr('width', function (d) {
    //     return 50;
    //     return d.size + 5;
    //   })
    //   .attr('height', function (d) {
    //     return 50;
    //     return d.size + 5;
    //   });

    // const node2 = svg.selectAll();

    // const node2 = svg
    //   .append('g')
    //   .selectAll('circle')
    //   .data(dataset.nodes)
    //   .enter()
    //   .append(() => document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
    //   .attr('width', function (d) {
    //     return 50;
    //     return d.size + 5;
    //   })
    //   .attr('height', function (d) {
    //     return 50;
    //     return d.size + 5;
    //   });

    simulation.on('tick', () => {
      // node.attr('x', (d: any) => d.x - 25).attr('y', (d: any) => d.y - 25);
      node.attr('x', (d: any) => d.x - 30).attr('y', (d: any) => d.y - 30);
      node.attr('cx', (node: any) => node.x);
      node.attr('cy', (node: any) => node.y);
      link
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    // <svg ref={svgRef} className="w-full h-full bg-pink-300" />
    <div ref={containerRef} className="bg-red-50"></div>
  );
};

export default Graph;

// const dataset = {
//   nodes: [
//     {
//       id: 1,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic1.png',
//       size: 50,
//     },
//     {
//       id: 2,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic2.png',
//       size: 35,
//     },
//     {
//       id: 3,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic3.png',
//       size: 55,
//     },
//     {
//       id: 4,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic4.png',
//       size: 45,
//     },
//     {
//       id: 5,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic5.png',
//       size: 52,
//     },
//     {
//       id: 6,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic6.png',
//       size: 51,
//     },
//     {
//       id: 7,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic9.png',
//       size: 60,
//     },
//     {
//       id: 8,
//       img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic10.png',
//       size: 60,
//     },
//   ],
//   links: [
//     { source: 7, target: 1 },
//     { source: 7, target: 6 },
//     { source: 7, target: 2 },
//     { source: 7, target: 3 },
//     { source: 7, target: 8 },
//     { source: 8, target: 4 },
//     { source: 8, target: 5 },
//     { source: 8, target: 6 },
//   ],
// };
