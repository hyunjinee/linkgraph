import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@linkgraph/db';

/*
  Graph Page
  서버에서 데이터 페칭 후 그래프 컴포넌트에게 데이터 전달. 그래프 컴포넌트는 클라이언트 컴포넌트
*/
const Graph = async ({ params }: { params: { userId: string[] } }) => {
  const userId = params.userId[0];
  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // if (true) {
  //   notFound();
  // }

  return <div>여기에 그래프가 온다.</div>;
};

export default Graph;

// import { NextPage } from 'next';
// import { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// import { nodes, links, MANY_BODY_STRENGTH } from '~/data/forcegraph';

// const centerX = 1000 / 2;
// const centerY = 1000 / 2;

// const Graph: NextPage = () => {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!svgRef.current) {
//       return;
//     }
//     const svg = d3.select(svgRef.current);

//     const simulation = d3
//       .forceSimulation(nodes as any)
//       .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
//       .force(
//         'link',
//         d3.forceLink(links).distance((link: any) => link.distance),
//       )
//       .force('center', d3.forceCenter(svgRef.current.width.baseVal.value / 2, svgRef.current.height.baseVal.value / 2));
//     // .force('center', d3.forceCenter(+svg.attr('width') / 2, +svg.attr('height') / 2));
//     const dragInteraction = d3.drag().on('drag', (event, node: any) => {
//       node.fx = event.x;
//       node.fy = event.y;

//       simulation.alpha(1);
//       simulation.restart();
//     });
//     const lines = svg
//       .selectAll('line')
//       .data(links)
//       .enter()
//       .append('line')
//       .attr('stroke', (link: any) => link.color || 'black');
//     const circles = svg
//       .selectAll('circle')
//       .data(nodes)
//       .enter()
//       .append('circle')
//       .attr('r', (node: any) => node.size)
//       .attr('fill', (node: any) => node.color || 'grey')
//       .call(dragInteraction as any);
//     const text = svg
//       .selectAll('text')
//       .data(nodes)
//       .enter()
//       .append('text')
//       .attr('text-anchor', 'middle')
//       .attr('alignment-baseline', 'middle')
//       .style('pointer-events', 'none')
//       .text((node: any) => node.id);

//     simulation.on('tick', () => {
//       circles.attr('cx', (node: any) => node.x);
//       circles.attr('cy', (node: any) => node.y);

//       text.attr('x', (node: any) => node.x).attr('y', (node: any) => node.y);

//       lines
//         .attr('x1', (link: any) => link.source.x)
//         .attr('y1', (link: any) => link.source.y)
//         .attr('x2', (link: any) => link.target.x)
//         .attr('y2', (link: any) => link.target.y);
//     });
//   }, []);
//   return (
//     <>
//       <div className="w-full h-full">
//         <svg ref={svgRef} className="w-full h-full" />
//       </div>
//     </>
//   );
// };

// export default Graph;
