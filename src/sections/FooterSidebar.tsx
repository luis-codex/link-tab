import { useGlobalStore } from '@app/store/store-global';
import { FolderTree, Link, ListTree } from 'lucide-react';

function ViewDataFolderSelected() {
  const data = useGlobalStore((s) => s.data);
  if (!data) return null;
  return (
    <div className='u-flex-center-start gap-4'>
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <FolderTree className='size-4' />
        </span>
        <span>{data.countSubFolders}</span>
      </div>
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <Link className='size-4' />
        </span>
        <span>{data.countSubLinks}</span>
      </div>
      /
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <ListTree className='size-4' />
        </span>
        <span>{data.countAllLinks}</span>
      </div>
    </div>
  );
}

export default function FooterSidebar() {
  return (
    <footer className='border-t p-3 border-accent-1 h-10'>
      <ViewDataFolderSelected />
    </footer>
  );
}
