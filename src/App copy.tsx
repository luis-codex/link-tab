import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable';
import useLoadBookmarks from './hooks/useLoadBookmarks';
import BookmarksContent from './sections/BookmarksContent';
import BookmarksFolders from './sections/BookmarksFolders';
import FooterSidebar from './sections/sidebar/FooterSidebar';
import HeaderSidebar from './sections/sidebar/HeaderSidebar';

const Sidebar = () => {
  return (
    <ResizablePanel
      defaultSize={30}
      maxSize={40}
      minSize={30}
      className='h-full flex flex-col relative'
    >
      <HeaderSidebar />
      <BookmarksFolders />
      <FooterSidebar />
    </ResizablePanel>
  );
};

const MainContent = () => (
  <ResizablePanel>
    <BookmarksContent />
  </ResizablePanel>
);

export default function AppCopy() {
  useLoadBookmarks();

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-[96vw] max-h-[600px] max-w-[1000px] mx-auto border overflow-hidden border-accent-1'
      style={{ height: '80vh' }}
    >
      <Sidebar />
      <ResizableHandle withHandle className='bg-accent-1 w-px' />
      <MainContent />
    </ResizablePanelGroup>
  );
}
