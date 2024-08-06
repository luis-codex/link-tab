import { Button } from '@app/components/ui/button';
import { Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function HeaderSidebar() {
  return (
    <div className='flex h-[52px] px-2 items-center gap-2 w-full'>
      {/* <NavLink
        to={'ai'}
        className={({ isActive }) => `${isActive && '*:text-accent-8'}`}
      >
        <Button variant='dark' size='icon'>
          <Sparkles className='size-4' />
        </Button>
      </NavLink> */}
      {/* <Button variant='dark' size='icon'>
        <IconStadistics className='size-4' />
      </Button> */}
      <NavLink
        to={'/settings'}
        className={({ isActive }) => `${isActive && '*:text-accent-8'}`}
      >
        <Button variant='dark' size='icon'>
          <Settings className='size-4' />
        </Button>
      </NavLink>
    </div>
  );
}
