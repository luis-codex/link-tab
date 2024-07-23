import { useThemeStore } from '@app/store/store-theme';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useLayoutEffect } from 'react';
import Stadistics from '../stadistics/Stadistics';

const ToggleTheme = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    toggleTheme();
  };

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button className='u-flex-center-start outline-none text-accent-5 hover:text-accent-7'>
      {theme === 'dark' ? (
        <Sun onClick={handleToggleTheme} className='size-4' />
      ) : (
        <Moon onClick={handleToggleTheme} className='size-4' />
      )}
    </button>
  );
};

export default function HeaderSidebar() {
  return (
    <div className='flex h-[52px] px-3 items-center gap-4'>
      <ToggleTheme />
      <button className='text-accent-5 hover:text-accent-7'>
        <Sparkles className='size-4' />
      </button>
      <Stadistics />
    </div>
  );
}
