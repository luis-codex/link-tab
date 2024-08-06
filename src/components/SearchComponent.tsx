import { useSearchStore } from '@app/store/useSearchStore';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  handleFilter: (value: string) => {
    filteredKeywords: string[];
    keywords: string[];
  };
};

export default function SearchComponent({ handleFilter }: Props) {
  const [setSearch, clear] = useSearchStore((s) => [s.setSearch, s.clear]);
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(handleFilter(valueSearch));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [valueSearch, handleFilter, setSearch]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  return (
    <form className='u-flex-center w-full h-full'>
      <span className='pl-4 pr-2 text-accent-5'>
        <Search className='size-4' />
      </span>
      <input
        type='text'
        placeholder='search...'
        value={valueSearch}
        onChange={handleChange}
        className='w-full px-2 py-1.5 bg-transparent placeholder:text-accent-5 outline-none h-full'
      />
    </form>
  );
}
