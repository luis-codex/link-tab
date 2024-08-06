import DigitScroller from '@app/components/DigitScroller';
import { MousePointerClick, X } from 'lucide-react';

type CounterSelectedProps = {
  count: number;
  handleCleanSelected: () => void;
  actionClick: () => void;
  disabled?: boolean;
};

const CounterSelected = ({
  handleCleanSelected,
  count,
  actionClick,
  disabled = false,
}: CounterSelectedProps) => {
  if (count === 0) return null;
  return (
    <div
      className='u-flex-center h-full relative gap-2 rounded-[calc(15px-5px)] px-2 font-base bg-accent-6/10 pr-4 animate-fade-in-blur data-[disabled="true"]:opacity-50 data-[disabled="true"]:pointer-events-none'
      data-disabled={disabled}
    >
      <button
        className='absolute -right-1 -top-1 p-0.5 text-red-500 bg-red-500/20 backdrop-blur-lg rounded-full'
        onClick={handleCleanSelected}
      >
        <X className='size-3' />
      </button>
      <button onClick={actionClick} className='outline-none'>
        <MousePointerClick className='size-4 text-accent-6' />
      </button>
      <DigitScroller count={`${count}`} className='font-mono' />
    </div>
  );
};

export default CounterSelected;
