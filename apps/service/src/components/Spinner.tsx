type SinnerProps = {
  size?: number;
  color?: string;
};

const Spinner = ({ size, color }: SinnerProps) => {
  return (
    <div
      className="animate-spin shrink-0"
      // className={cn(`w-[24px] h-[24px]`, 'animate-spin border-[2.5px] ')}
      style={{
        width: '24px',
        height: '24px',
        border: '2.5px solid #f3f3f3',
        borderTop: `2.5px solid pink`,
        borderRadius: '50%',
        boxSizing: 'border-box',
      }}
    ></div>
  );
};

export default Spinner;
