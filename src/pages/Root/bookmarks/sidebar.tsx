import { IconFolderClosed } from '@app/assets/icons';
import { DubleButtonCollapse } from '@app/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@app/components/ui/context-menu';
import useToogle from '@app/hooks/useToogle';
import useStoreSidebar from '@app/store/Sidebar/useStoreSidebar';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useDrag } from '@app/store/useDrag';
import { BookmarkNode } from '@app/types/bookmarks';
import { useLongPress } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import React, { memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type FolderParentProps = {
  title: string;
  children: React.ReactNode;
  subChildren: BookmarkNode[];
  id: string;
  node: BookmarkNode;
};

const useLogicParent = (id: string, subChildren: BookmarkNode[]) => {
  const [collapse, toggleCollapse] = useToogle(false);
  const navigation = useNavigate();

  const [handleCleanSelected] = useBookmarksStore((s) => [
    s.handleCleanSelected,
  ]);
  const dataID = useBookmarksStore((state) => state.metadataFolder)?.id;
  const [dragItem] = useDrag((s) => [s.dragItem]);

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

  const handleClick = useCallback(async () => {
    if (dragItem) {
      // switch (dragItem.type) {
      //   // case 'move-folder': {
      //   //   if (dragItem.payload.id === id) SetDragItem(null);
      //   //   else await moveFolderInFolder(dragItem.payload.id, id);
      //   //   break;
      //   // }
      //   // case 'move-link': {
      //   //   await moveLinksInFolder(dragItem.payload.selected, id);
      //   //   break;
      //   // }
      //   // default:
      //   //   break;
      // }
      handleCleanSelected();
      // SetDragItem(null);
    } else {
      navigation(`/bookmarks/${id}`);
    }
  }, [dragItem, navigation, id, handleCleanSelected]);

  const isSelected = useMemo(() => dataID === id, [dataID, id]);

  return { isSelected, handleClick, folders, collapse, toggleCollapse };
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
  const SetIdNewFolder = useStoreSidebar((s) => s.SetIdNewFolder);

  return active ? (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
        <ContextMenuContent className='border-none before-noise bg-background/50 backdrop-blur-3xl font-light tracking-wide text-accent-5'>
          <ContextMenuItem
            className='u-flex-center-start gap-4 cursor-pointer hover:text-accent-7'
            onSelect={() => SetIdNewFolder({ id, title, type: 'edit' })}
          >
            <span>
              <Pencil className='size-4' />
            </span>
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            className='u-flex-center-start gap-4 cursor-pointer hover:text-accent-7'
            onSelect={() => SetIdNewFolder({ id, type: 'new' })}
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

const FolderParent = memo(
  ({ title, children, subChildren, id }: FolderParentProps) => {
    const { isSelected, folders, collapse, toggleCollapse, handleClick } =
      useLogicParent(id, subChildren);

    const location = useLocation();

    const activePage = `/bookmarks/${id}` === location.pathname;

    const dragItem = useDrag((s) => s.dragItem);

    const isDrag = useMemo(() => {
      if (!dragItem) return false;
      // if (dragItem.type === 'move-folder' && dragItem.payload.id === id) {
      //   return true;
      // }
      return false;
    }, [dragItem]);

    const a = useLongPress(() => {}, {
      onCancel: () => {
        handleClick();
      },
      threshold: 500,
    });

    return (
      <div className='w-full max-w-full' key={id}>
        <CardContextMenu active={id !== '0'} id={id} title={title}>
          <DubleButtonCollapse
            selected={activePage}
            open={collapse}
            data-drag={isDrag}
            className='data-[drag="true"]:bg-stripes-dark data-[drag="true"]:opacity-70'
            btnText={{
              ...a,
              children: id === '0' ? 'Bookmarks' : title.trim() || '...',
            }}
            btnIcon={{ onClick: toggleCollapse, hidden: folders.length === 0 }}
          >
            {activePage && (
              <motion.div
                layoutId='badge'
                className='bg-accent-6/15 size-full absolute rounded-lg z-[-1] inset-0'
                transition={{
                  duration: 0.5,
                  ease: 'anticipate',
                  velocity: 0.1,
                }}
              />
            )}
          </DubleButtonCollapse>
        </CardContextMenu>

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

const Area = () => {
  const bookmarksTree = useBookmarksStore((state) => state.bookmarksTree);
  return bookmarksTree?.map((bookmark) => (
    <RenderTree key={bookmark.id} data={bookmark} />
  ));
};

export default function BookmarksSidebar() {
  return <Area />;
}
