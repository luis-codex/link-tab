import { ResizablePanel } from '@app/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@app/components/ui/scroll-area';
import { SidebarProvider } from '@app/store/Sidebar/Provider-sidebar';
import { AppWindowMac } from 'lucide-react';
import { lazy, Suspense } from 'react';
import FooterSidebar from '../../../sections/sidebar/FooterSidebar';
import HeaderSidebar from './HeaderSidebar';

const BookmarksSidebarLazy = lazy(() => import('../bookmarks/sidebar'));
const TabsSidebarLazy = lazy(() => import('../tabs/sidebar'));
const ModalNewFoldersLazy = lazy(
  () => import('@app/sections/BookmarksFolders/ModalNewFolders')
);

export default function SectionSidebar() {
  return (
    <SidebarProvider>
      <ResizablePanel
        defaultSize={30}
        maxSize={40}
        minSize={30}
        className='h-full flex flex-col relative bg-background/30'
      >
        <HeaderSidebar />
        {/*  */}
        <ScrollArea className='font-mono overflow-auto flex-1 text-sm lowercase flex flex-col p-3 relative'>
          <Suspense>
            <BookmarksSidebarLazy />
          </Suspense>
          <div className='h-px w-full bg-accent-8/5 my-4 relative'>
            <div className='flex items-center gap-2 w-fit mx-auto absolute inset-x-0 -top-2.5 backdrop-blur-3xl'>
              <span>
                <AppWindowMac className='size-4 stroke-current fill-none' />
              </span>
              windows
            </div>
          </div>
          <Suspense>
            <TabsSidebarLazy />
          </Suspense>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        {/*  */}
        <FooterSidebar />
      </ResizablePanel>
      {/* <ModalNewFolders /> */}
      <Suspense>
        <ModalNewFoldersLazy />
      </Suspense>
    </SidebarProvider>
  );
}
