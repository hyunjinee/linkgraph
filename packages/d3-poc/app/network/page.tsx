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

const Network = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(dataset.links)
      .enter()
      .append('line')
      .style('stroke-width', 2.5)
      .attr('stroke', (link: any) => link.color || 'black');

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(dataset.nodes)
      .enter()
      .append('image')
      .attr('xlink:href', function (d) {
        return d.img;
      })
      .attr('width', function (d) {
        return d.size + 5;
      })
      .attr('height', function (d) {
        return d.size + 5;
      });

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

    simulation.on('tick', () => {
      node.attr('x', (d: any) => d.x - 25).attr('y', (d: any) => d.y - 25);

      link
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });
    // function ticked() {
    //   link
    //     .attr('x1', (d: any) => d.source.x)
    //     .attr('y1', (d: any) => d.source.y)
    //     .attr('x2', (d: any) => d.target.x)
    //     .attr('y2', (d: any) => d.target.y);

    //   node.attr('x', (d: any) => d.x - 25).attr('y', (d: any) => d.y - 25);
    // }
  }, []);

  return <div ref={containerRef} className="bg-red-50"></div>;
};

export default Network;

//create dummy data
const dataset = {
  nodes: [
    {
      id: 1,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic1.png',
      size: 50,
    },
    {
      id: 2,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic2.png',
      size: 35,
    },
    {
      id: 3,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic3.png',
      size: 55,
    },
    {
      id: 4,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic4.png',
      size: 45,
    },
    {
      id: 5,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic5.png',
      size: 52,
    },
    {
      id: 6,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic6.png',
      size: 51,
    },
    {
      id: 7,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic9.png',
      size: 60,
    },
    {
      id: 8,
      img: 'https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic10.png',
      size: 60,
    },
  ],
  links: [
    { source: 7, target: 1 },
    { source: 7, target: 6 },
    { source: 7, target: 2 },
    { source: 7, target: 3 },
    { source: 7, target: 8 },
    { source: 8, target: 4 },
    { source: 8, target: 5 },
    { source: 8, target: 6 },
  ],
};
