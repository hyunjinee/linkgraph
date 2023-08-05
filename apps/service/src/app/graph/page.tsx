'use client';

import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// import { nodes, links, MANY_BODY_STRENGTH } from '~/data/forcegraph';

type ForcedNode = d3.SimulationNodeDatum & { id: string; img: string | null; size: number; url?: string };
type ForcedLink = d3.SimulationLinkDatum<ForcedNode>;

const nodes: ForcedNode[] = [
  { id: 'clj9jym390000mn0fp7zg4740', img: null, size: 80 },
  {
    id: 'cljlb7lfr0005mg0fnefsnqrc',
    img: 'https://d1wdpf820bqp3t.cloudfront.net/link/2023-07-02%2019%3A48%3A49-git.png',
    size: 40,
    url: 'dd',
  },
  {
    id: 'cljlb7rdz0007mg0fwgzrqld3',
    img: 'https://d1wdpf820bqp3t.cloudfront.net/link/2023-07-02%2019%3A48%3A56-hd-wallpaper-1867616.jpg',
    size: 40,
    url: 'dd',
  },
  {
    id: 'cljz40a0k00012nfp5dtnq12u',
    img: 'https://d1wdpf820bqp3t.cloudfront.net/link/2023-07-12%2011%3A35%3A56-4-oAlu23brk2SDcWeskvoJzLDPc1BfLllTRXXL2y5A6VaBtjO-YVD9oC53KMNCyBVtaTq5e1Frkjo9yMpDebn-T1BBHudd9JMG3H8bVPl110Sd_uIUjaRGBByVOXJT9dVrErOF9MPSf11A022Z4q0A.svg',
    size: 40,
    url: 'dd',
  },
];

const links = [
  {
    source: 'clj9jym390000mn0fp7zg4740',
    target: 'cljlb7lfr0005mg0fnefsnqrc',
  },
  {
    source: 'clj9jym390000mn0fp7zg4740',
    target: 'cljlb7rdz0007mg0fwgzrqld3',
  },
  {
    source: 'clj9jym390000mn0fp7zg4740',
    target: 'cljz40a0k00012nfp5dtnq12u',
  },
];

const Graph: NextPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .text('hi');
    const svg = d3.select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 2])
      .on('zoom', ({ transform }) => {
        nodeGroup.attr('transform', transform);
        linkGroup.attr('transform', transform);
      });

    zoom(svg);

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(() => 100),
      )
      .force('charge', d3.forceManyBody().strength(-2000).distanceMin(150))
      .force('collide', d3.forceCollide().radius(35).strength(0.7))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // const dragInteraction = d3.drag().on('drag', (event, node: any) => {
    //   node.fx = event.x;
    //   node.fy = event.y;

    //   simulation.alpha(1);
    //   simulation.restart();
    // });
    const dragInteraction = d3
      .drag<SVGGElement, ForcedNode>()
      .on('start', () => {
        simulation.alphaTarget(0.1).restart();
      })
      .on('drag', (event: DragEvent, node) => {
        node.fx = event.x;
        node.fy = event.y;
      })
      .on('end', (_, node) => {
        nodeList.style('cursor', 'grab');
        simulation.alphaTarget(0);
        node.fx = null;
        node.fy = null;
      });

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
      console.log(svgRef.current, '?wjrfew');
      if (svgRef.current) {
        svgRef.current.remove();
      }
      // window.removeEventListener('resize', updateDimensions);
    };
    // const simulation = d3
    //   .forceSimulation<ForcedNode>(nodes)
    //   .force(
    //     'link',
    //     d3
    //       .forceLink(links)
    //       .id((d: any) => d.id)
    //       .distance(180)
    //       .strength(0.8),
    //   )
    //   .force('charge', d3.forceManyBody().strength(-1000).distanceMin(100))
    //   .force('x', d3.forceX());
    // id(id: (node: NodeDatum, i: number, nodesData: NodeDatum[]) => (string | number)): this;
    // const simulation = d3
    // .forceSimulation(nodes as any)
    // .force(
    //   'link',
    //   d3
    //     .forceLink(links)
    //     .id((d: any) => d.id)
    //     .distance(() => 100),
    // )
    // .force('charge', d3.forceManyBody().strength(-500))
    // .force('center', d3.forceCenter(width / 2, height / 2));

    // const simulation = d3
    //   .forceSimulation(nodes as any)
    //   .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
    //   .force(
    //     'link',
    //     d3.forceLink(links).distance((link: any) => link.distance),
    //   )
    //   .force('center', d3.forceCenter(svgRef.current.width.baseVal.value / 2, svgRef.current.height.baseVal.value / 2));
    // // .force('center', d3.forceCenter(+svg.attr('width') / 2, +svg.attr('height') / 2));
    // const dragInteraction = d3.drag().on('drag', (event, node: any) => {
    //   node.fx = event.x;
    //   node.fy = event.y;

    //   simulation.alpha(1);
    //   simulation.restart();
    // });
    // const lines = svg
    //   .selectAll('line')
    //   .data(links)
    //   .enter()
    //   .append('line')
    //   .attr('stroke', (link: any) => link.color || 'black');
    // const circles = svg
    //   .selectAll('circle')
    //   .data(nodes)
    //   .enter()
    //   .append('circle')
    //   .attr('r', (node: any) => node.size)
    //   .attr('fill', (node: any) => node.color || 'grey')
    //   .call(dragInteraction as any);
    // const text = svg
    //   .selectAll('text')
    //   .data(nodes)
    //   .enter()
    //   .append('text')
    //   .attr('text-anchor', 'middle')
    //   .attr('alignment-baseline', 'middle')
    //   .style('pointer-events', 'none')
    //   .text((node: any) => node.id);

    // simulation.on('tick', () => {
    //   circles.attr('cx', (node: any) => node.x);
    //   circles.attr('cy', (node: any) => node.y);

    //   text.attr('x', (node: any) => node.x).attr('y', (node: any) => node.y);

    //   lines
    //     .attr('x1', (link: any) => link.source.x)
    //     .attr('y1', (link: any) => link.source.y)
    //     .attr('x2', (link: any) => link.target.x)
    //     .attr('y2', (link: any) => link.target.y);
    // });
  }, []);

  return (
    <>
      <div className="w-full h-full bg-red-50">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </>
  );
};

export default Graph;
