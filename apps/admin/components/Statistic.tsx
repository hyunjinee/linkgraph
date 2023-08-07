import CountUp from 'react-countup';
import { ArrowDown, ArrowUp } from 'lucide-react';

type StatisticProps = { data: any };

const renderChangeRate = (value: number) => {
  if (value > 0) {
    return (
      <span className="bg-emerald flex items-center rounded-full px-2 py-1 text-sm text-white">
        <ArrowUp className="h-4 w-5" />
        {value}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="bg-alizarin flex items-center rounded-full px-2 py-1 text-sm text-white">
        <ArrowDown className="h-4 w-5" />
        {value}%
      </span>
    );
  }
};

const Statistic = ({ data }: StatisticProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-5">
          <div>방문자</div>
          <div className="mt-3">
            <div className="mt-4 flex items-center">
              <div className="grow text-2xl font-semibold">
                <CountUp end={1000000} separator="," />명
              </div>
              <div>{renderChangeRate(100)}</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-5">
          <div>유저</div>
          <div className="mt-3">
            <div className="mt-4 flex items-center">
              <div className="grow text-2xl font-semibold">
                <CountUp end={1000000} separator="," />명
              </div>
              <div>{renderChangeRate(100)}</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-5">
          <div>링크</div>
          <div className="mt-3">
            <div className="mt-4 flex items-center">
              <div className="grow text-2xl font-semibold">
                <CountUp end={1000000} separator="," />명
              </div>
              <div>{renderChangeRate(100)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
