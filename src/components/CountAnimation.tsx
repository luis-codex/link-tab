import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const sizes = {
  '--4': '1rem',
  '--5': '1.25rem',
  '--6': '1.5rem',
  '--7': '1.75rem',
  '--8': '2rem',
  '--9': '2.25rem',
};

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
};

interface Props {
  number: number;
  size: keyof typeof sizes;
  textSize: keyof typeof textSizes;
}

interface PropsCol {
  number: number;
  size: keyof typeof sizes;
}

const Col1 = ({ number, size = '--8' }: PropsCol) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const { current } = scrollRef;
    const el = current?.querySelector(`#num-${number}`) as HTMLElement | null;
    if (!current || !el) return;

    const top = el.offsetTop;
    controls.start({ top: -top, opacity: 1 });
  }, [controls, number]);

  return (
    <div
      style={{ '--size': sizes[size] } as React.CSSProperties}
      className='h-[var(--size)] w-[0.67em] aspect-square relative overflow-hidden'
      ref={scrollRef}
    >
      <motion.ul
        className='absolute flex-center flex-col text-center h-[inherit] w-[inherit] leading-[var(--size)] text-[1em]'
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        initial={{ top: 0, opacity: 0 }}
        animate={controls}
      >
        {[...Array(10)].map((_, i) => (
          <li
            key={i}
            id={`num-${i}`}
            data-active={i === number}
            className='h-[inherit] w-[inherit]'
          >
            {i}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default function CountAnimation({
  number,
  size,
  textSize = 'xs',
}: Props) {
  return (
    <div
      className={`*:inline-block u-flex-center-start w-fit ${textSizes[textSize]}`}
    >
      {Array.from(String(number), Number).map((number, index) => (
        <Col1 key={index} number={number} size={size} />
      ))}
    </div>
  );
}
