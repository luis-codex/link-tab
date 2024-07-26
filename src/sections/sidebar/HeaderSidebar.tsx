import BtnToggleTheme from '@app/components/btn-toggle-theme';
import { Sparkles } from 'lucide-react';
import Stadistics from '../stadistics/Stadistics';

export default function HeaderSidebar() {
  return (
    <div className='flex h-[52px] px-3 items-center gap-4'>
      <BtnToggleTheme />
      <button className='text-accent-5 hover:text-accent-7'>
        <Sparkles className='size-4' />
      </button>
      <Stadistics />
    </div>
  );
}
