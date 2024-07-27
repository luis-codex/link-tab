import { IconFolderClosed, IconFolderOpen, IconTrash } from '@app/assets/icons';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@app/components/ui/context-menu';
import { ScrollArea, ScrollBar } from '@app/components/ui/scroll-area';
import { deleteFolder } from '@app/services/bookmarks';
import useStoreSidebar from '@app/store/Sidebar/useStoreSidebar';
import { BookmarkNode, useGlobalStore } from '@app/store/store-global';
import { motion } from 'framer-motion';
import { Cloud, Hand, Pencil } from 'lucide-react';
import React, { memo, useCallback, useMemo, useState } from 'react';

type FolderParentProps = {
  title: string;
  children: React.ReactNode;
  subChildren: BookmarkNode[];
  id: string;
  node: BookmarkNode;
};

const useToggleCollapse = () => {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  return { collapse, toggleCollapse };
};

const useLogicParent = (id: string, subChildren: BookmarkNode[]) => {
  const { collapse, toggleCollapse } = useToggleCollapse();
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
    if (dataID === id) {
      SetDataList();
      return;
    }
    SetDataList(id);
  }, [dragItem, dataID, id, SetDataList, SetDragItem]);

  const isSelected = useMemo(() => dataID === id, [dataID, id]);

  return { isSelected, handleClick, folders, collapse, toggleCollapse };
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
  title,
}: {
  children: React.ReactNode;
  active: boolean;
  id: string;
  title: string;
}) => {
  const SetDragItem = useGlobalStore((s) => s.SetDragItem);
  const SetIdNewFolder = useStoreSidebar((s) => s.SetIdNewFolder);

  return active ? (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
        <ContextMenuContent className='border border-accent-1 bg-accent-1 font-light tracking-wide text-accent-5'>
          <ContextMenuItem
            className='u-flex-center-start gap-4'
            onSelect={() => SetDragItem({ type: 'folder', id })}
          >
            <span>
              <Hand className='size-4' />
            </span>
            Move
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className='u-flex-center-start gap-4'
            onSelect={() => {
              SetIdNewFolder({ id, title, type: 'edit' });
            }}
          >
            <span>
              <Pencil className='size-4' />
            </span>
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            className='u-flex-center-start gap-4 text-red-500'
            onSelect={() => {
              deleteFolder(id);
            }}
          >
            <span>
              <IconTrash className='size-4' />
            </span>
            Delete
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className='u-flex-center-start gap-4'
            onSelect={() => {
              SetIdNewFolder({ id, type: 'new' });
            }}
          >
            <span>
              <IconFolderClosed className='size-4' />
            </span>
            New Subfolder
          </ContextMenuItem>
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
      <CardContextMenu
        active={id !== '0' && parentID !== '0'}
        id={id}
        title={title}
      >
        <h2
          id='sidebar-folder-label'
          data-id={id}
          className='px-2 py-1 hover:text-accent-8 cursor-pointer max-w-[200px] truncate animate-fade-in-blur'
          onClick={handleClick}
        >
          {id === '0' ? 'Bookmarks' : title.trim() || '...'}
        </h2>
      </CardContextMenu>
      <LineSeparator />
    </>
  );
};

const FolderParent = memo(
  ({ title, children, subChildren, id, node }: FolderParentProps) => {
    const { isSelected, handleClick, folders, collapse, toggleCollapse } =
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
                <IconFolderOpen className='size-4' />
              ) : (
                <IconFolderClosed className='size-4' />
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
          data-visible={folders.length > 0 && collapse}
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
      node={data}
      key={data.id}
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
