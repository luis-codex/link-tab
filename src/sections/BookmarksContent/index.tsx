import { ScrollArea } from '@app/components/ui/scroll-area';
import { useGlobalStore } from '@app/store/store-global';
import { formatMMDDYYYY } from '@app/utils';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const useProcessBookmarks = () => {
  const [dataList, keysSearchList] = useGlobalStore((s) => [
    s.dataList,
    s.keysSearchList,
  ]);

  const list = useMemo(() => {
    if (!dataList) return [];
    if (!keysSearchList) return dataList.list;

    return dataList.list.filter((bookmark) =>
      keysSearchList.every((key) => bookmark.title.toLowerCase().includes(key))
    );
  }, [dataList, keysSearchList]);

  return { list };
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
      onClick={() => toggleSelectLink(bookmark.id)}
      className='text-accent-7 relative flex flex-col group py-3 data-[is-selected="true"]:bg-stripes p-4'
    >
      <h3 className='dark:text-accent-7/90 text-accent-6 truncate font-light tracking-wide mb-1'>
        {bookmark.title}
      </h3>
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
    </div>
  ));
}

export default function BookmarksContent() {
  return (
    <div className='flex flex-col h-full'>
      <div className='border-b border-accent-1 px-2 py-1'>
        <SearchComponent />
      </div>
      <ScrollArea className='lowercase flex-1'>
        <div className='size-full grid grid-cols-1 sm:grid-cols-2'>
          <List />
        </div>
      </ScrollArea>
    </div>
  );
}
