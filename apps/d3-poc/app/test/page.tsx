'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import ForceGraph from '../components/ForceGraph';

const icon_source = './earth.png';

const links = [
  { source: 'Samsung', target: 'Amb network', icon: icon_source },
  { source: 'Motorola', target: 'Amb network', icon: icon_source },
  { source: 'Nokia', target: 'Amb network', icon: icon_source },
  { source: 'HTC', target: 'Amb network', icon: icon_source },
  { source: 'Kodak', target: 'Amb network', icon: icon_source },
];

const nodes: any = {};

links.forEach((link) => {
  link.source = nodes[link.source] || (nodes[link.source] = { name: link.source, icon: link.icon });
  link.target = nodes[link.target] || (nodes[link.target] = { name: link.target, icon: link.icon });
});

const Test = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // const force = d3.layout
  //   .force()
  //   .nodes(d3.values(nodes))
  //   .links(links)
  //   .size([width, height])
  //   .linkDistance(180)
  //   .charge(-300)
  //   .on('tick', tick)
  //   .start();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen w-full bg-red-50">
      {/* <svg ref={svgRef} className="w-full h-full"></svg>
      
      */}
      {/* hi */}
      <ForceGraph />
    </div>
  );
};

export default Test;

// var width = 960,
//     height = 800;

// var force = d3.layout.force()
//     .nodes(d3.values(nodes))
//     .links(links)
//     .size([width, height])
//     .linkDistance(180)
//     .charge(-300)
//     .on("tick", tick)
//     .start();

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var link = svg.selectAll(".link")
//     .data(force.links())
//     .enter().append("line")
//     .attr("class", "link");

// var node = svg.selectAll(".node")
//     .data(force.nodes())
//     .enter().append("g")
//     .attr("class", "node")
//     .on("mouseover", mouseover)
//     .on("mouseout", mouseout)
//     .call(force.drag);

// node.append("circle")
//     .attr("r", 8);

// node.append("image")
//       .attr("xlink:href", function(d) { return d.icon; })
//       .attr("x", "-12px")
//       .attr("y", "-12px")
//       .attr("width", "24px")
//       .attr("height", "24px");

// node.append("a")
//     .attr("xlink:href", function(d) {return "http://somelink.com/link.php?id="})
//     .append("circle")
//       .attr("cx", 24 )
//       .attr("cy", 0 )
//       .attr("r", 4)
//       .style("fill", "blue")
//       .style("opacity", 0.5);

// node.append("text")
//     .attr("x", 32)
//     .attr("dy", ".35em")
//     .text(function(d) { return d.name; });

// function tick() {
//   link
//       .attr("x1", function(d) { return d.source.x; })
//       .attr("y1", function(d) { return d.source.y; })
//       .attr("x2", function(d) { return d.target.x; })
//       .attr("y2", function(d) { return d.target.y; });

//   node
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
// }

// function mouseover() {
//   d3.select(this).select("circle").transition()
//       .duration(750)
//       .attr("r", 16);
// }

// function mouseout() {
//   d3.select(this).select("circle").transition()
//       .duration(750)
//       .attr("r", 8);
// }
