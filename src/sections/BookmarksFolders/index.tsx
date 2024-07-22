import { ScrollArea, ScrollBar } from '@app/components/ui/scroll-area';
import { BookmarkNode, useGlobalStore } from '@app/store/store-global';
import { getBookmarksWithUrls } from '@app/utils';
import bookmarksTree from '@public/bookmarks.json';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';

type PropsFolderParent = {
  title: string;
  subChildren: BookmarkNode[];
  node: BookmarkNode;

  id: string;

  children: React.ReactNode;
};

const FolderParent = (props: PropsFolderParent) => {
  const { title, children, subChildren, id, node } = props;

  const [collapse, setCollapse] = useState(true);
  const SetData = useGlobalStore((s) => s.SetData);
  const dataID = useGlobalStore((s) => s.data)?.id;

  const { folders, links } = subChildren.reduce(
    (acc, curr) => {
      if (curr.children) acc.folders.push(curr);
      else acc.links.push(curr);
      return acc;
    },
    { links: [] as BookmarkNode[], folders: [] as BookmarkNode[] }
  );

  const isParent = folders.length > 0;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Esto detiene la propagación del evento al padre
    const bookmarks = getBookmarksWithUrls([node]);

    SetData({
      id,
      title,
      list: bookmarks,
      countAllLinks: bookmarks.length,

      countSubFolders: folders.length,
      countSubLinks: links.length,
    });
  };

  const selected = dataID === id;

  return (
    <div className='w-fit'>
      <div
        className='flex items-center relative w-fit text-accent-6 data-[selected="true"]:text-accent-8 h-7'
        data-selected={selected}
      >
        {selected && (
          <motion.div
            layoutId='badge'
            className='bg-accent-1 size-full absolute rounded-lg z-[-1]'
            transition={{ duration: 0.5, ease: 'anticipate', velocity: 0.1 }}
          />
        )}
        {isParent && (
          <button
            data-collapse={collapse}
            className='data-[collapse="false"]:rotate-90 transition-transform duration-300 ease-in-out px-2'
            onClick={() => setCollapse(!collapse)}
          >
            ▶
          </button>
        )}
        <h3
          className='px-2 py-1 hover:text-accent-8 cursor-pointer max-w-[200px] truncate animate-fade-in-blur'
          onClick={handleClick}
        >
          {title.trim() || '...'}
        </h3>

        <footer></footer>
      </div>

      <div
        className='pl-4 relative data-[visible="false"]:hidden'
        data-visible={isParent && !collapse}
      >
        {selected && (
          <div className='border-l absolute h-full border-accent-2 border-dashed left-2 animate-fade' />
        )}
        {children}
      </div>
    </div>
  );
};

const Render = ({ data }: { data: BookmarkNode }) => {
  return (
    data.children && (
      <FolderParent
        title={data.title}
        subChildren={data.children}
        id={data.id}
        key={data.id}
        node={data}
      >
        {data.children.map((child) => (
          <Render key={child.id} data={child} />
        ))}
      </FolderParent>
    )
  );
};

export default function BookmarksFolders() {
  const SetData = useGlobalStore((s) => s.SetData);
  const bookmarks = getBookmarksWithUrls(bookmarksTree);

  useEffect(() => {
    SetData({
      id: bookmarksTree[0].id,
      title: bookmarksTree[0].title,
      countSubFolders: bookmarksTree[0].children.filter((b) => b.children)
        .length,
      countSubLinks: bookmarksTree[0].children.filter((b) => !b.children)
        .length,

      countAllLinks: bookmarks.length,
      list: bookmarks,
    });
  }, [bookmarks, SetData]);

  return (
    <ScrollArea className='font-mono text-sm lowercase overflow-auto h-full px-3'>
      {bookmarksTree.map((bookmark) => (
        <Render key={bookmark.id} data={bookmark} />
      ))}

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
