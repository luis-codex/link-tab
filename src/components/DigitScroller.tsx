import { cn } from '@app/lib/utils';
import { motion } from 'framer-motion';

const CountItem = ({
  num,
  gap,
  height = 20,
  width = 20,
}: {
  num: number;
  gap: number;
  width?: number;
  height?: number;
}) => {
  return (
    <div
      className='relative overflow-hidden'
      style={{
        mask: `linear-gradient(to bottom, transparent, black ${gap}px, black calc(100% - ${gap}px), transparent)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <motion.div
        className='absolute w-full inset-0 mx-auto flex flex-col items-center'
        style={{ gap: `${gap}px` }}
        initial={{ top: 0 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          duration: 0.3,
        }}
        animate={{ top: -(height * num + num * gap) }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i}>
            <div
              className='u-flex-center text-center'
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              {i}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const DigitScroller = ({
  count,
  height = 25,
  width = 11,
  gap = 4,
  className,
}: {
  count: string;
  width?: number;
  height?: number;
  gap?: number;
  className?: string;
}) => (
  <div className={cn('flex items-center text-sm font-light', className)}>
    {Array.from(count, Number).map((number, i) => (
      <CountItem num={number} gap={gap} height={height} width={width} key={i} />
    ))}
  </div>
);

export default DigitScroller;
