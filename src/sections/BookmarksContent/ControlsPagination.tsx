import CountAnimation from '@app/components/CountAnimation';
import { useGlobalStore } from '@app/store/store-global';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React from 'react';

const Counter = () => {
  const { start, end } = useGlobalStore((s) => s.currentPageSlice);
  return (
    <div className='u-flex-center gap-4 rounded-xl px-2 font-base'>
      <CountAnimation number={start} size='--7' textSize='sm' /> -
      <CountAnimation number={end} size='--7' textSize='sm' />
    </div>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  // const [open, setOpen] = useState(false);

  return (
    <ul
      className='absolute w-fit px-2 inset-x-0 h-10 bottom-0 mx-auto bg-accent-1 u-flex-center gap-2 *:u-flex-center *:rounded translate-y-[2.2em] hover:translate-y-0 transition-transform duration-300 ease-in-out'
      // data-active={open}
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      {children}
    </ul>
  );
};

const ControlsPagination = () => {
  const last = useGlobalStore((s) => s.last);
  const prev = useGlobalStore((s) => s.prev);
  const next = useGlobalStore((s) => s.next);
  const start = useGlobalStore((s) => s.start);

  const pages = useGlobalStore((s) => s.pages);
  const currentPage = useGlobalStore((s) => s.currentPage);

  return (
    <Container>
      <>
        <button
          onClick={start}
          disabled={currentPage === 1}
          className='disabled:cursor-not-allowed disabled:opacity-50 size-7 hover:text-muted-foreground'
        >
          <ChevronFirst className='size-5 shrink-0' />
        </button>
        <button
          onClick={prev}
          disabled={currentPage === 1}
          className='disabled:cursor-not-allowed disabled:opacity-50 size-7 hover:text-muted-foreground'
        >
          <ChevronLeft className='size-5 shrink-0' />
        </button>
        <Counter />
        <button
          onClick={next}
          disabled={currentPage === pages}
          className='disabled:cursor-not-allowed disabled:opacity-50 size-7 hover:text-muted-foreground'
        >
          <ChevronRight className='size-5 shrink-0' />
        </button>
        <button
          onClick={last}
          disabled={currentPage === pages}
          className='disabled:cursor-not-allowed disabled:opacity-50 size-7 hover:text-muted-foreground'
        >
          <ChevronLast className='size-5 shrink-0' />
        </button>
      </>
    </Container>
  );
};

export default ControlsPagination;
