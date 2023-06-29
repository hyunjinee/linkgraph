'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 400;

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

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .text('hi');

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(() => 100),
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const dragInteraction = d3.drag().on('drag', (event, node: any) => {
      node.fx = event.x;
      node.fy = event.y;

      simulation.alpha(1);
      simulation.restart();
    });

    const svg = d3.select(containerRef.current).append('svg').attr('width', width).attr('height', height);

    const linkGroup = svg.append('g').attr('id', 'links');
    const nodeGroup = svg.append('g').attr('id', 'nodes');

    const nodeList = nodeGroup.selectAll('g').data(nodes).join('g');

    nodeList.each(function (d: any) {
      if (d.img) {
        d3.select(this)
          .append('foreignObject')
          .attr('width', '80px')
          .attr('height', '80px')
          .attr('class', 'node')
          .call(dragInteraction as any)
          .on('click', () => {
            if (d.url.startsWith('https')) {
              window.open('https://github.com/hyunjinee');
            }
          })
          .on('mouseover.tooltip', function (d, e) {
            // d3.select(this).transition().duration(300).style('opacity', 1);
            // tooltip.html('ID: hi');
            return tooltip.style('visibility', 'visible');
            // console.log('hi');

            // .style('left', e.pageX + 'px')
            // .style('top', (e.pageY as any) + 10 + 'px');
          })
          .on('mousemove.tooltip', function (e) {
            // console.log(d);
            // console.log(e);
            return tooltip.style('top', e.pageY - 10 + 'px').style('left', e.pageX + 10 + 'px');
          })
          .on('mouseout', function () {
            return tooltip.style('visibility', 'hidden');
          })
          .style('user-select', 'none')

          .append('xhtml:img')
          .attr('src', () => d.img || '')
          .style('width', '80px')
          .style('height', '80px')
          .style('object-fit', 'cover')
          .style('border-radius', '50%')
          .style('cursor', 'pointer');
      } else {
        d3.select(this)
          .append('circle')
          .attr('r', 30)
          .attr('class', 'node')
          .attr('fill', 'grey')
          .call(dragInteraction as any);
      }
    });
    const link = linkGroup
      .selectAll('line')
      .data(links)
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

    simulation.on('tick', () => {
      // node.attr('x', (d: any) => d.x - 25).attr('y', (d: any) => d.y - 25);
      node.attr('x', (d: any) => d.x - 40).attr('y', (d: any) => d.y - 40);
      node.attr('cx', (node: any) => node.x);
      node.attr('cy', (node: any) => node.y);
      link
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });

    // const updateDimensions = () => {
    //   setWidth(window.innerWidth);
    //   setHeight(window.innerHeight);
    // };

    // window.addEventListener('resize', updateDimensions);

    return () => {
      simulation.stop();
      // window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    // <svg ref={svgRef} className="w-full h-full bg-pink-300" />
    <div ref={containerRef} className="bg-red-50"></div>
  );
};

export default Graph;
