import DigitScroller from '@app/components/DigitScroller';
import { useBookmarksStore } from '@app/store/useBookmark';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

const Counter = () => {
  const { start, end } = useBookmarksStore((s) => s.currentPageSlice);
  return (
    <div className='u-flex-center gap-4 rounded-xl px-2 font-base'>
      <DigitScroller count={`${start}`} className='text-md font-mono' />
      <DigitScroller count={`${end}`} className='text-md font-mono' />
    </div>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className='absolute group w-fit pb-2 inset-x-0 h-fit bottom-0 mx-auto rounded-lg translate-y-[2.6em] data-[open="true"]:translate-y-0 transition-transform duration-300 ease-in-out animate-fade-in-blur'
      onMouseEnter={() => setOpen(true)}
      data-open={open}
    >
      <div
        data-open={open}
        className='w-[200px] h-2 -translate-y-9 bg-accent-2 data-[open="true"]:hidden rounded-[calc(15px-5px)]'
      ></div>
      <ul
        data-open={open}
        className='hidden data-[open="true"]:u-flex-center w-fit px-2 h-10 text-accent-6 rounded-[calc(15px-5px)] gap-2 bg-background/80 relative before:absolute before:rounded-[calc(15px-4px)] before:size-full before:inset-0 before:bg-background/80 before:bg-[url(/bg-noise.webp)] before:z-[-1] before:opacity-90 overflow-hidden'
      >
        {children}
      </ul>
      <button
        data-open={open}
        className='data-[open="false"]:hidden absolute -right-1.5 -top-1.5 bg-red-500/20 text-red-500 backdrop-blur-3xl rounded-full p-px'
        onClick={() => setOpen(false)}
      >
        <X className='size-4' />
      </button>
    </div>
  );
};

const SelectFiltered = () => {
  const [handleSelectAll] = useBookmarksStore((s) => [s.handleSelectAll]);

  const handleClick = () => {
    handleSelectAll();
  };

  return (
    <button
      className='bg-accent-6/15 hover:opacity-90 text-accent-7/90 hover:text-accent-8 transition-colors duration-300 ease-in-out h-7 uppercase text-xs text-nowrap font-medium px-3 rounded-[calc(15px-7px)] animate-fade-in-blur'
      onClick={handleClick}
    >
      <span>select all</span>
    </button>
  );
};

const Btns = () => {
  const last = useBookmarksStore((s) => s.last);
  const prev = useBookmarksStore((s) => s.prev);
  const next = useBookmarksStore((s) => s.next);
  const start = useBookmarksStore((s) => s.start);

  const pages = useBookmarksStore((s) => s.pages);
  const currentPage = useBookmarksStore((s) => s.currentPage);

  return (
    <>
      <div className='h-3/5 w-px bg-accent-3'></div>
      <div className='text-accent-6 u-flex-center gap-2 *:u-flex-center *:rounded'>
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
      </div>
    </>
  );
};

const ControlsPagination = () => {
  const dataList = useBookmarksStore((s) => s.dataList);
  if (!dataList || dataList.length === 0) return null;

  return (
    <Container>
      <SelectFiltered />
      <Btns />
    </Container>
  );
};

export default ControlsPagination;
