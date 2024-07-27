import CountAnimation from '@app/components/CountAnimation';
import { useGlobalStore } from '@app/store/store-global';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React, { useMemo } from 'react';

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
  return (
    <ul className='absolute w-fit px-2 inset-x-0 h-10 bottom-0 mx-auto text-accent-6 bg-accent-2 dark:bg-accent-1 u-flex-center gap-2 translate-y-[2.2em] hover:translate-y-0 transition-transform duration-300 ease-in-out'>
      {children}
    </ul>
  );
};

const SelectFiltered = () => {
  const [dataList, keysSearchList, toggleSelectLink, handleCleanSelected] =
    useGlobalStore((s) => [
      s.dataList,
      s.keysSearchList,
      s.toggleSelectLink,
      s.handleCleanSelected,
    ]);
  const listID = useMemo(() => {
    if (!dataList) return null;
    if (!keysSearchList || keysSearchList.length === 0) return null;

    const listFiltered = dataList.filter((bookmark) => {
      return keysSearchList.every(
        (key) =>
          bookmark.title.toLowerCase().includes(key) ||
          bookmark.url?.toLowerCase().includes(key)
      );
    });
    return listFiltered.map((bookmark) => bookmark.id);
  }, [dataList, keysSearchList]);

  const handleClick = () => {
    if (!listID) return;
    handleCleanSelected();
    listID.forEach((id) => toggleSelectLink(id));
  };

  if (!listID) return null;
  return (
    <button
      className='bg-accent-4 hover:opacity-90 text-accent-7 h-7 uppercase text-xs text-nowrap font-medium px-3 rounded animate-fade-in-blur'
      onClick={handleClick}
    >
      <span>select all</span>
    </button>
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
      <SelectFiltered />
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
    </Container>
  );
};

export default ControlsPagination;
