import { Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';

const ToggleTheme = () => {
  const [isDark, setisDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setisDark(!isDark);
  };

  return (
    <button className='u-flex-center-start outline-none px-2'>
      {isDark ? (
        <Sun onClick={toggleTheme} className='size-4' />
      ) : (
        <Moon onClick={toggleTheme} className='size-4' />
      )}
    </button>
  );
};

export default function HeaderSidebar() {
  return (
    <div className='flex h-[45px] border-accent-1 border-b p-3'>
      <div className='u-flex-center'>
        <span className='px-2 text-accent-5'>
          <Search className='size-4' />
        </span>
        <input
          type='text'
          placeholder='search...'
          className='w-full px-2 py-1.5 bg-transparent placeholder:text-accent-4 outline-none'
        />
      </div>
      <ToggleTheme />
    </div>
  );
}
