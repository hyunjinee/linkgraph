import * as d3 from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 50;
const mourthWidth = 20;
const mouthRadius = 140;
const mouthArc: any = d3
  .arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mourthWidth)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * (3 / 2));

const SmileFace = () => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {/* 얼굴 */}
        <circle r={centerY - strokeWidth / 2} fill="yellow" stroke="black" strokeWidth={strokeWidth} />
        {/* 눈 */}
        <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
        <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
        {/* 입 */}
        <path d={mouthArc()} />
      </g>
    </svg>
  );
};

export default SmileFace;
