'use client';

import ReactCountUp from 'react-countup';

type CountUpProps = {
  number: number;
};

const CountUp = ({ number }: CountUpProps) => {
  return <ReactCountUp end={number} separator=","></ReactCountUp>;
};

export default CountUp;
