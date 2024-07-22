import { ScrollArea } from '@app/components/ui/scroll-area';
import { useGlobalStore } from '@app/store/store-global';
import { formatMMDDYYYY } from '@app/utils';
import { GripHorizontal, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const useProcessBookmarks = () => {
  const [data, keysSearchList] = useGlobalStore((s) => [
    s.data,
    s.keysSearchList,
  ]);

  const dataList = useMemo(() => {
    if (!data) return [];
    if (!keysSearchList) return data.list;

    return data.list.filter((bookmark) =>
      keysSearchList.every((key) => bookmark.title.toLowerCase().includes(key))
    );
  }, [data, keysSearchList]);

  return { dataList };
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
        className='w-full px-2 py-1.5 bg-transparent placeholder:text-accent-4 outline-none'
      />
    </div>
  );
}

function List() {
  const { dataList } = useProcessBookmarks();
  return (
    <ScrollArea className='size-full px-3'>
      <div className='size-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 py-4'>
        {dataList.map((bookmark) => (
          <div
            key={bookmark.id}
            className='text-accent-7 relative flex flex-col !overflow-visible group py-3 pt-4'
          >
            <div className='w-full truncate mb-1'>
              <button className='size-fit mx-auto bg-accent-1 px-1.5 py-1 rounded-lg absolute -top-2 inset-x-0 group-hover:block animate-fade animate-duration-300 hidden'>
                <GripHorizontal className='size-4' />
              </button>
              <span className='dark:text-accent-7 text-accent-6'>
                {bookmark.title}
              </span>
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
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default function BookmarksContent() {
  return (
    <>
      <div className='border-b border-accent-1 px-2 py-1'>
        <SearchComponent />
      </div>
      <List />
    </>
  );
}
