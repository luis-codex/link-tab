import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@app/components/ui/resizable';
import SectionSidebar from '@app/pages/Root/(index)/sidebar';
import { Outlet } from 'react-router-dom';

const Root = () => (
  <ResizablePanelGroup
    direction='horizontal'
    className='!u-size-screen mx-auto overflow-hidden'
  >
    <SectionSidebar />
    <ResizableHandle withHandle className='bg-background/30 w-px z-50' />
    <ResizablePanel className='h-full flex flex-col relative'>
      <Outlet />
    </ResizablePanel>
  </ResizablePanelGroup>
);

export default Root;
