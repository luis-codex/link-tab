import CountAnimation from '@app/components/CountAnimation';
import { ScrollArea } from '@app/components/ui/scroll-area';
import { createNewTab } from '@app/services/tabs';
import { useGlobalStore } from '@app/store/store-global';
import { formatMMDDYYYY } from '@app/utils';
import { GripVertical, Search } from 'lucide-react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import ControlsPagination from './ControlsPagination';

const useProcessBookmarks = () => {
  const [
    dataList,
    keysSearchList,
    SetCountList,
    currentPageSlice,
    metadataFolder,
    SetDataList,
  ] = useGlobalStore((s) => [
    s.dataList,
    s.keysSearchList,
    s.SetCountList,
    s.currentPageSlice,
    s.metadataFolder,
    s.SetDataList,
  ]);
  const refFirst = useRef(false);

  useEffect(() => {
    let firstTime = true;
    if (firstTime) {
      firstTime = false;
      return;
    }
    if (metadataFolder) {
      SetDataList(metadataFolder.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList, refFirst]);

  const list = useMemo(() => {
    if (!dataList) return [];
    if (!keysSearchList) return dataList;

    const listFiltered = dataList.filter((bookmark) => {
      return keysSearchList.every(
        (key) =>
          bookmark.title.toLowerCase().includes(key) ||
          bookmark.url?.toLowerCase().includes(key)
      );
    });

    SetCountList(listFiltered.length);
    return listFiltered;
  }, [SetCountList, dataList, keysSearchList]);

  return { list: list.slice(currentPageSlice.start, currentPageSlice.end) };
};

function SearchComponent() {
  const [valueSearch, setValueSearch] = useState('');
  const SetKeysSearchList = useGlobalStore((s) => s.SetKeysSearchList);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      SetKeysSearchList(valueSearch.trim().toLowerCase().split(' '));
    }, 500);
    return () => clearTimeout(timer);
  }, [SetKeysSearchList, valueSearch]);

  return (
    <div className='u-flex-center'>
      <span className='px-2 text-accent-5'>
        <Search className='size-4' />
      </span>
      <input
        type='text'
        placeholder='search...'
        value={valueSearch}
        onChange={handleChange}
        className='w-full px-2 py-1.5 bg-transparent placeholder:text-accent-5 outline-none'
      />
    </div>
  );
}

function List() {
  const { list } = useProcessBookmarks();
  const linksSelected = useGlobalStore((s) => s.linksSelected);
  const toggleSelectLink = useGlobalStore((s) => s.toggleSelectLink);

  return list.map((bookmark) => (
    <div
      key={bookmark.id}
      data-is-selected={linksSelected?.includes(bookmark.id)}
      onClick={() => {
        toggleSelectLink(bookmark.id);
      }}
      className='text-accent-7 relative flex flex-col group py-3 data-[is-selected="true"]:bg-stripes-light dark:data-[is-selected="true"]:bg-stripes-dark p-4'
    >
      <div className='dark:text-accent-7/90 text-accent-6 truncate mb-1 grid grid-cols-[auto,1fr] items-center gap-3'>
        {bookmark.favicon && (
          <img
            src={bookmark.favicon}
            alt={bookmark.title}
            className='size-4 inline-block'
          />
        )}
        <h3 className='truncate'>{bookmark.title}</h3>
      </div>

      {bookmark.titleParent && (
        <div className='font-light text-sm text-accent-4 font-mono truncate'>
          <span>{bookmark.titleParent}</span>
        </div>
      )}
      {bookmark.dateAdded && (
        <span className='text-accent-4 text-sm font-light'>
          {formatMMDDYYYY(bookmark.dateAdded)}
        </span>
      )}
      {bookmark.url && (
        <a
          className='my-2 truncate text-sm text-accent-5 font-light italic hover:underline underline-offset-2 cursor-pointer w-fit max-w-full'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            createNewTab(bookmark.url as string);
          }}
        >
          {bookmark.url}
        </a>
      )}
    </div>
  ));
}

const CounterSelected = () => {
  const [linksSelected, SetDragItem] = useGlobalStore((s) => [
    s.linksSelected,
    s.SetDragItem,
  ]);
  if (!linksSelected) return null;
  return (
    <div className='u-flex-center gap-4 rounded-lg px-2 font-base bg-accent-1'>
      <button
        onClick={() => {
          SetDragItem({
            type: 'move-link',
            payload: { selected: linksSelected },
          });
        }}
        className='outline-none'
      >
        <GripVertical className='size-4' />
      </button>
      <CountAnimation number={linksSelected.length} size='--7' textSize='sm' />
    </div>
  );
};

export default function BookmarksContent() {
  return (
    <div className='flex flex-col h-full relative'>
      <div className='border-b border-accent-1 px-2 py-1 u-flex-center-between'>
        <Suspense>
          <SearchComponent />
        </Suspense>
        <CounterSelected />
      </div>
      <ScrollArea className='lowercase flex-1'>
        <div className='size-full grid grid-cols-1 sm:grid-cols-2'>
          <List />
        </div>
      </ScrollArea>
      <ControlsPagination />
    </div>
  );
}
