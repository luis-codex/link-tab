import { useGlobalStore } from '@app/store/store-global';
import { FolderTree, Link, ListTree } from 'lucide-react';

function ViewDataFolderSelected() {
  const dataList = useGlobalStore((s) => s.dataList);
  if (!dataList) return null;
  return (
    <div className='u-flex-center-start gap-4'>
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <FolderTree className='size-4' />
        </span>
        <span>{dataList.countSubFolders}</span>
      </div>
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <Link className='size-4' />
        </span>
        <span>{dataList.countSubLinks}</span>
      </div>
      /
      <div className='u-flex-center w-fit gap-2 text-sm text-accent-6'>
        <span>
          <ListTree className='size-4' />
        </span>
        <span>{dataList.countAllLinks}</span>
      </div>
    </div>
  );
}

export default function FooterSidebar() {
  return (
    <footer className='px-3 u-flex-center-start h-12'>
      <ViewDataFolderSelected />
    </footer>
  );
}
