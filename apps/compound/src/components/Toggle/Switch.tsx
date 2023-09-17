import './Switch.styles.css';

type SwitchProps = {
  on: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  [key: string]: any;
};

const noop = () => {};

const Switch = ({ on, onClick, className, ariaLabel, ...props }: SwitchProps) => {
  const btnClassName = [className, 'toggle-btn', on ? 'toggle-btn-on' : 'toggle-btn-off'].filter(Boolean).join(' ');

  return (
    <label aria-label={ariaLabel ?? 'Toggle'} style={{ display: 'block' }}>
      <input type="checkbox" className="toggle-input" checked={on} onChange={noop} onClick={onClick} />
      <span className={btnClassName} {...props}></span>
    </label>
  );
};

export default Switch;
