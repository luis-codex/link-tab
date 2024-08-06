import { ScrollArea } from '@app/components/ui/scroll-area';
import useScrollEdgeDetection from '@app/hooks/useScrollEdgeDetection ';
import { createNewTab } from '@app/services/tabs';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useDrag } from '@app/store/useDrag';
import { useSearchStore } from '@app/store/useSearchStore';
import { BookmarkNode } from '@app/types/bookmarks';
import { formatMMDDYYYY } from '@app/utils';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

const useLoader = () => {
  const { id } = useParams();
  const [setDataList, bookmarksTree] = useBookmarksStore((s) => [
    s.setDataList,
    s.bookmarksTree,
  ]);

  useEffect(() => {
    setDataList(id);
  }, [bookmarksTree, id, setDataList]);
};

const useProcessBookmarks = () => {
  const [
    dataList,
    SetCountList,
    currentPageSlice,
    metadataFolder,
    SetDataList,
    bookmarksTree,
    setDataListIDFiltered,
  ] = useBookmarksStore((s) => [
    s.dataList,
    s.setCountList,
    s.currentPageSlice,
    s.metadataFolder,
    s.setDataList,
    s.bookmarksTree,
    s.setDataListIDFiltered,
  ]);

  const [filteredKeywords, keywords] = useSearchStore((s) => [
    s.filteredKeywords,
    s.keywords,
  ]);

  const refFirst = useRef(false);

  useEffect(() => {
    if (!refFirst.current) {
      refFirst.current = true;
      return;
    }

    if (metadataFolder) {
      SetDataList(metadataFolder.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarksTree]);

  const list = useMemo(() => {
    if (!dataList || dataList.length === 0) return [];

    const keys = [...keywords, ...filteredKeywords];

    const filterFolder = (bookmark: BookmarkNode, key: string) => {
      if (key.startsWith('@dir')) {
        const folderName = key.replace('@dir[', '').replace(']', '');
        return bookmark.titleParent?.toLowerCase() === folderName;
      }
      return false;
    };

    const listFiltered = dataList.filter((bookmark) => {
      const titleLower = bookmark.title.toLowerCase();
      const urlLower = bookmark.url?.toLowerCase();

      return keys.every(
        (key) =>
          filterFolder(bookmark, key) ||
          titleLower.includes(key) ||
          (urlLower && urlLower.includes(key))
      );
    });

    return listFiltered;
  }, [dataList, keywords, filteredKeywords]);

  useEffect(() => {
    SetCountList(list.length);
    setDataListIDFiltered(list.map((bookmark) => bookmark.id));
  }, [SetCountList, setDataListIDFiltered, list]);

  return { list: list.slice(currentPageSlice.start, currentPageSlice.end) };
};

function ListItems() {
  const { list } = useProcessBookmarks();
  const linksSelected = useBookmarksStore((s) => s.linksSelected);
  const toggleSelectLink = useBookmarksStore((s) => s.toggleSelectLink);
  const dragItem = useDrag((s) => s.dragItem);

  return (
    <div className='size-full px-2 py-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {list.map((bookmark) => (
        <motion.div
          key={bookmark.id}
          data-disabled={dragItem && dragItem.type === 'bookmark'}
          data-is-selected={linksSelected?.includes(bookmark.id)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              delay: Math.random() * 0.4,
              damping: 18,
            },
          }}
          exit={{ opacity: 0, scale: 0.9, y: -50 }}
          onClick={() => toggleSelectLink(bookmark.id)}
          className='data-[is-selected="true"]:bg-accent-6/10 text-accent-7 relative flex flex-col group py-3 p-4 data-[disabled="true"]:opacity-50 data-[disabled="true"]:pointer-events-none data-[disabled="true"]:select-none group rounded-xl'
        >
          <div className='text-accent-7/90 truncate mb-1 grid grid-cols-[auto,1fr] items-center gap-3'>
            {bookmark.favicon && (
              <img
                src={bookmark.favicon}
                alt={bookmark.title}
                className='size-4 inline-block'
              />
            )}
            <h3 className='truncate group-hover:text-accent-8'>
              {bookmark.title}
            </h3>
          </div>

          {bookmark.titleParent && (
            <div className='font-light text-sm text-accent-6 font-mono truncate'>
              <span>{bookmark.titleParent}</span>
            </div>
          )}

          {bookmark.dateAdded && (
            <span className='text-accent-6 text-sm font-light'>
              {formatMMDDYYYY(bookmark.dateAdded)}
            </span>
          )}
          {bookmark.url && (
            <a
              className='my-2 truncate text-sm text-accent-6  font-light italic hover:underline underline-offset-2 cursor-pointer w-fit max-w-full'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                createNewTab(bookmark.url as string);
              }}
            >
              {bookmark.url}
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function List() {
  useLoader();
  const [ref, active] = useScrollEdgeDetection({
    selectorChild: 'div[data-radix-scroll-area-viewport]',
  });
  return (
    <ScrollArea
      ref={ref}
      className='lowercase flex-1'
      style={{
        mask: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000 ${
          active.isBottom ? 0 : 10
        }%, #000 ${active.isTop ? 100 : 90}%, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <ListItems />
    </ScrollArea>
  );
}
