'use client';

import * as RadixSlider from '@radix-ui/react-slider';

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const Slider = ({ value = 1, onChange }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center w-full h-10 select-none touch-none"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="h-[3px] bg-neutral-600 relative grow rounded-full">
        <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
