import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@app/components/ui/context-menu';
import { ScrollArea, ScrollBar } from '@app/components/ui/scroll-area';
import { BookmarkNode, useGlobalStore } from '@app/store/store-global';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import React, { memo, useCallback, useMemo, useState } from 'react';
// Hook personalizado para manejar el estado de despliegue
function useToggle(initialState = true) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((state) => !state);
  return [state, toggle] as const;
}

type FolderParentProps = {
  title: string;
  children: React.ReactNode;
  subChildren: BookmarkNode[];
  id: string;
  node: BookmarkNode;
};

const useLogicParent = (id: string, subChildren: BookmarkNode[]) => {
  const [collapse, toggleCollapse] = useToggle();
  const SetDataList = useGlobalStore((state) => state.SetDataList);
  const dataID = useGlobalStore((state) => state.metadataFolder)?.id;
  const [dragItem, SetDragItem] = useGlobalStore((s) => [
    s.dragItem,
    s.SetDragItem,
  ]);

  const { folders } = useMemo(
    () =>
      subChildren.reduce(
        (acc, curr) => {
          if (curr.children) acc.folders.push(curr);
          return acc;
        },
        { folders: [] as BookmarkNode[] }
      ),
    [subChildren]
  );

  const handleClick = useCallback(() => {
    if (dragItem) {
      console.log('dragItem', dragItem);
      SetDragItem(null);
      console.log('dragItem', dragItem);
      return;
    }
    SetDataList(id);
  }, [dragItem, id, SetDataList, SetDragItem]);

  const isSelected = useMemo(() => dataID === id, [dataID, id]);

  return { collapse, toggleCollapse, isSelected, handleClick, folders };
};

type CardProps = {
  title: string;
  id: string;
  handleClick: () => void;
  parentID?: string;
};

const CardContextMenu = ({
  children,
  active,
  id,
}: {
  children: React.ReactNode;
  active: boolean;
  id: string;
}) => {
  const SetDragItem = useGlobalStore((s) => s.SetDragItem);

  return active ? (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
        <ContextMenuContent className='border border-accent-1 bg-accent-1 font-light tracking-wide'>
          <ContextMenuItem onSelect={() => SetDragItem({ type: 'folder', id })}>
            Move
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>New Subfolder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  ) : (
    children
  );
};

const LineSeparator = () => {
  const dragItem = useGlobalStore((s) => s.dragItem);
  return (
    <div
      data-active={dragItem !== null}
      className='w-full h-1 data-[active="false"]:invisible rounded-full group-hover:bg-accent-7 absolute inset-x-0 bottom-0'
    />
  );
};

const Card = ({ handleClick, id, title, parentID }: CardProps) => {
  return (
    <>
      <CardContextMenu active={id !== '0' && parentID !== '0'} id={id}>
        <h2
          id='sidebar-folder-label'
          data-id={id}
          className='px-2 py-1 hover:text-accent-8 cursor-pointer max-w-[200px] truncate animate-fade-in-blur'
          onClick={handleClick}
        >
          {title.trim() || '...'}
        </h2>
      </CardContextMenu>
      <LineSeparator />
    </>
  );
};

const IconFolderClosed = ({ className }: { className: string }) => (
  <svg
    data-testid='geist-icon'
    height='16'
    stroke-linejoin='round'
    viewBox='0 0 16 16'
    width='16'
    className={className}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M14.5 4V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V2.5H6L7.33333 3.5C7.76607 3.82456 8.29241 4 8.83333 4H14.5ZM0 1H1.5H6.16667C6.38304 1 6.59357 1.07018 6.76667 1.2L8.23333 2.3C8.40643 2.42982 8.61696 2.5 8.83333 2.5H14.5H16V4V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1ZM5.75 8H5V9.5H5.75H10.25H11V8H10.25H5.75Z'
      fill='currentColor'
    ></path>
  </svg>
);

const IconFolderOpen = ({ className }: { className: string }) => (
  <svg
    height='16'
    strokeLinejoin='round'
    viewBox='0 0 16 16'
    width='16'
    className={className}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.5 4V6H2.5V2.5H6L7.33333 3.5C7.76607 3.82456 8.29241 4 8.83333 4H13.5ZM1 6V2.5V1H2.5H6.16667C6.38304 1 6.59357 1.07018 6.76667 1.2L8.23333 2.3C8.40643 2.42982 8.61696 2.5 8.83333 2.5H13.5H15V4V6H16L15.8333 7.5L15.2471 12.7761C15.1064 14.0422 14.0363 15 12.7624 15H3.23761C1.96373 15 0.893573 14.0422 0.752898 12.7761L0.166667 7.5L0 6H1ZM14 7.5H2H1.6759L2.24372 12.6104C2.29999 13.1169 2.72806 13.5 3.23761 13.5H12.7624C13.2719 13.5 13.7 13.1169 13.7563 12.6104L14.3241 7.5H14Z'
      fill='currentColor'
    ></path>
  </svg>
);

const FolderParent = memo(
  ({ title, children, subChildren, id, node }: FolderParentProps) => {
    const { collapse, toggleCollapse, isSelected, handleClick, folders } =
      useLogicParent(id, subChildren);

    return (
      <div className='w-full max-w-full flex-1' key={id}>
        <div
          className='flex items-center relative w-fit text-accent-6 data-[selected="true"]:text-accent-8 h-7 group'
          data-selected={isSelected}
        >
          {isSelected && (
            <motion.div
              layoutId='badge'
              className='bg-accent-1 size-full absolute rounded-lg z-[-1]'
              transition={{ duration: 0.5, ease: 'anticipate', velocity: 0.1 }}
            />
          )}
          {folders.length > 0 && (
            <button
              onClick={toggleCollapse}
              // data-collapse={collapse}
              className='data-[collapse="false"]:rotate-90 transition-transform duration-300 ease-in-out px-2 outline-none'
            >
              {/* ▶ */}
              {collapse ? (
                <IconFolderClosed className='size-4' />
              ) : (
                <IconFolderOpen className='size-4' />
              )}
            </button>
          )}
          <Card
            title={title}
            id={id}
            handleClick={handleClick}
            parentID={node.parentId}
          />
        </div>
        <div
          className='pl-4 relative data-[visible="false"]:hidden'
          data-visible={folders.length > 0 && !collapse}
        >
          {isSelected && (
            <div className='border-l absolute h-full border-accent-2 border-dashed left-2 animate-fade' />
          )}
          {children}
        </div>
      </div>
    );
  }
);

const RenderTree = ({ data }: { data: BookmarkNode }) =>
  data.children && (
    <FolderParent
      title={data.title}
      subChildren={data.children}
      id={data.id}
      key={data.id}
      node={data}
    >
      {data.children.map((child) => (
        <RenderTree key={child.id} data={child} />
      ))}
    </FolderParent>
  );

const Cube = ({ className }: { className: string }) => (
  <div
    className={`${className} size-4 border-l border-b border-accent-3 absolute`}
  />
);

const Area = () => {
  const bookmarksTree = useGlobalStore((state) => state.bookmarksTree);
  return bookmarksTree?.map((bookmark) => (
    <RenderTree key={bookmark.id} data={bookmark} />
  ));
};

export default function BookmarksFolders() {
  return (
    <ScrollArea className='font-mono text-sm lowercase overflow-auto h-full p-3 w-full relative'>
      <div className='h-px w-full absolute inset-x-0 top-0 bg-accent-1'></div>
      <div className='h-px w-full absolute inset-x-0 bottom-0 bg-accent-1'></div>
      <Cube className='top-0 right-0 rotate-180' />
      <Cube className='bottom-0 right-0 -rotate-90' />

      <Area />
      <div className='u-flex-center-start gap-2 w-fit my-3 text-blue-500'>
        <span>
          <Cloud className='size-4' />
        </span>
        cloud
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
