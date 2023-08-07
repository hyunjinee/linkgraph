import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './ForceGraph.module.css';

const ForceGraph = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      // const { destroy } = runForceGraph(containerRef.current, nodes, links);
      // destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.container}></div>;
};

export default ForceGraph;

const nodes = [
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
];
const links = [
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
];

// function runForceGraph(container: any, linksData: any, nodesData: any, nodeHoverTooltip?: any) {
//   const links = linksData.map((d: any) => Object.assign({}, d));
//   const nodes = nodesData.map((d: any) => Object.assign({}, d));
//   console.log(nodes, links);
//   const containerRect = container.getBoundingClientRect();
//   const height = containerRect.height;
//   const width = containerRect.width;

//   const color = () => {
//     return '#9d00a0';
//   };

//   const icon = (d) => {
//     return d.gender === 'male' ? '\uf222' : '\uf221';
//   };

//   const getClass = (d: any) => {
//     return d.gender === 'male' ? styles.male : styles.female;
//   };

//   const simulation = d3
//     .forceSimulation(nodes)
//     .force(
//       'link',
//       d3.forceLink(links).id((d: any) => d.id),
//     )
//     .force('charge', d3.forceManyBody().strength(-150))
//     .force('x', d3.forceX())
//     .force('y', d3.forceY());

//   const svg = d3
//     .select(container)
//     .append('svg')
//     .attr('viewBox', [-width / 2, -height / 2, width, height]);

//   const link = svg
//     .append('g')
//     .attr('stroke', '#999')
//     .attr('stroke-opacity', 0.6)
//     .selectAll('line')
//     .data(links)
//     .join('line')
//     .attr('stroke-width', (d: any) => Math.sqrt(d.value));

//   const node = svg
//     .append('g')
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 2)
//     .selectAll('circle')
//     .data(nodes)
//     .join('circle')
//     .attr('r', 12)
//     .attr('fill', color);
//   // .call(drag(simulation));

//   const label = svg
//     .append('g')
//     .attr('class', 'labels')
//     .selectAll('text')
//     .data(nodes)
//     .enter()
//     .append('text')
//     .attr('text-anchor', 'middle')
//     .attr('dominant-baseline', 'central')
//     .attr('class', (d) => `fa ${getClass(d)}`)
//     .text((d) => {
//       return icon(d);
//     });
//   // .call(drag(simulation));

//   simulation.on('tick', () => {
//     //update link positions
//     link
//       .attr('x1', (d: any) => d.source.x)
//       .attr('y1', (d: any) => d.source.y)
//       .attr('x2', (d: any) => d.target.x)
//       .attr('y2', (d: any) => d.target.y);

//     // update node positions
//     node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

//     // update label positions
//     label
//       .attr('x', (d: any) => {
//         return d.x;
//       })
//       .attr('y', (d: any) => {
//         return d.y;
//       });
//   });

//   return {
//     destroy: () => {
//       simulation.stop();
//     },
//     nodes: () => {
//       return svg.node();
//     },
//   };
// }

// export function runForceGraph(container, linksData, nodesData, nodeHoverTooltip) {
//   const links = linksData.map((d) => Object.assign({}, d));
//   const nodes = nodesData.map((d) => Object.assign({}, d));

//   const containerRect = container.getBoundingClientRect();
//   const height = containerRect.height;
//   const width = containerRect.width;

//   const color = () => {
//     return '#9D00A0';
//   };

//   const icon = (d) => {
//     return d.gender === 'male' ? '\uf222' : '\uf221';
//   };

//   const getClass = (d) => {
//     return d.gender === 'male' ? styles.male : styles.female;
//   };

//   const drag = (simulation) => {
//     const dragstarted = (d) => {
//       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     };

//     const dragged = (d) => {
//       d.fx = d3.event.x;
//       d.fy = d3.event.y;
//     };

//     const dragended = (d) => {
//       if (!d3.event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     };

//     return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
//   };

//   // Add the tooltip element to the graph
//   const tooltip = document.querySelector('#graph-tooltip');
//   if (!tooltip) {
//     const tooltipDiv = document.createElement('div');
//     tooltipDiv.classList.add(styles.tooltip);
//     tooltipDiv.style.opacity = '0';
//     tooltipDiv.id = 'graph-tooltip';
//     document.body.appendChild(tooltipDiv);
//   }
//   const div = d3.select('#graph-tooltip');

//   const addTooltip = (hoverTooltip, d, x, y) => {
//     div.transition().duration(200).style('opacity', 0.9);
//     div
//       .html(hoverTooltip(d))
//       .style('left', `${x}px`)
//       .style('top', `${y - 28}px`);
//   };

//   const removeTooltip = () => {
//     div.transition().duration(200).style('opacity', 0);
//   };

//   const simulation = d3
//     .forceSimulation(nodes)
//     .force(
//       'link',
//       d3.forceLink(links).id((d) => d.id),
//     )
//     .force('charge', d3.forceManyBody().strength(-150))
//     .force('x', d3.forceX())
//     .force('y', d3.forceY());

//   const svg = d3
//     .select(container)
//     .append('svg')
//     .attr('viewBox', [-width / 2, -height / 2, width, height])
//     .call(
//       d3.zoom().on('zoom', function () {
//         svg.attr('transform', d3.event.transform);
//       }),
//     );

//   const link = svg
//     .append('g')
//     .attr('stroke', '#999')
//     .attr('stroke-opacity', 0.6)
//     .selectAll('line')
//     .data(links)
//     .join('line')
//     .attr('stroke-width', (d) => Math.sqrt(d.value));

//   const node = svg
//     .append('g')
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 2)
//     .selectAll('circle')
//     .data(nodes)
//     .join('circle')
//     .attr('r', 12)
//     .attr('fill', color)
//     .call(drag(simulation));

//   const label = svg
//     .append('g')
//     .attr('class', 'labels')
//     .selectAll('text')
//     .data(nodes)
//     .enter()
//     .append('text')
//     .attr('text-anchor', 'middle')
//     .attr('dominant-baseline', 'central')
//     .attr('class', (d) => `fa ${getClass(d)}`)
//     .text((d) => {
//       return icon(d);
//     })
//     .call(drag(simulation));

//   label
//     .on('mouseover', (d) => {
//       addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
//     })
//     .on('mouseout', () => {
//       removeTooltip();
//     });

//   simulation.on('tick', () => {
//     //update link positions
//     link
//       .attr('x1', (d) => d.source.x)
//       .attr('y1', (d) => d.source.y)
//       .attr('x2', (d) => d.target.x)
//       .attr('y2', (d) => d.target.y);

//     // update node positions
//     node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

//     // update label positions
//     label
//       .attr('x', (d) => {
//         return d.x;
//       })
//       .attr('y', (d) => {
//         return d.y;
//       });
//   });

//   return {
//     destroy: () => {
//       simulation.stop();
//     },
//     nodes: () => {
//       return svg.node();
//     },
//   };
// }
