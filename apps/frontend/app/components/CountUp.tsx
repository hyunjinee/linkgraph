'use client';

import ReactCountUp from 'react-countup';

type CountUpProps = {
  number: number;
  className: string;
};

const CountUp = ({ number, className }: CountUpProps) => {
  return <ReactCountUp end={number} separator="," className={className}></ReactCountUp>;
};

export default CountUp;
