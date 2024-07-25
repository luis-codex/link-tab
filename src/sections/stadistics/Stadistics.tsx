import { useGlobalStore } from '@app/store/store-global';
import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

type BookmarkNode = chrome.bookmarks.BookmarkTreeNode;

function flattenBookmarkTree(nodes: chrome.bookmarks.BookmarkTreeNode[]) {
  const duplicateUrls: Record<string, BookmarkNode[]> = {};
  const duplicateTitles: Record<string, BookmarkNode[]> = {};

  const nodeStack: BookmarkNode[] = [...nodes];
  while (nodeStack.length) {
    const node = nodeStack.pop()!;
    const { children, title, url } = node;

    if (url) {
      if (duplicateUrls[url]) duplicateUrls[url].push(node);
      else duplicateUrls[url] = [node];
    }

    if (title) {
      if (duplicateTitles[title]) duplicateTitles[title].push(node);
      else duplicateTitles[title] = [node];
    }

    if (children) nodeStack.push(...children);
  }

  // elimina a los que no tienen duplicados
  Object.entries(duplicateUrls).forEach(([url, nodes]) => {
    if (nodes.length === 1) delete duplicateUrls[url];
  });

  return { duplicateUrls, duplicateTitles };
}

function Stadisticss() {
  const [duplicateUrls, setDuplicateUrls] =
    useState<Record<string, BookmarkNode[]>>();
  const bookmarksTree = useGlobalStore((state) => state.bookmarksTree);

  useEffect(() => {
    if (!bookmarksTree) return;
    // console.log(flattenBookmarkTree(bookmarksTree));
    const { duplicateUrls } = flattenBookmarkTree(bookmarksTree);
    setDuplicateUrls(duplicateUrls);
  }, [bookmarksTree]);

  return (
    <div className='h-[500px] overflow-auto w-full'>
      Stadistics
      <br />
      <div>
        <h2>Duplicate Urls</h2>
        {duplicateUrls && (
          <div className='grid gap-8'>
            <div>
              <h2 className='text-accent-7 my-3'>
                Total: {Object.keys(duplicateUrls).length}
              </h2>
            </div>

            {Object.entries(duplicateUrls).map(([url, nodes]) => (
              <div key={url} className='grid gap-8 border p-3 break-all'>
                {nodes.map((node) => (
                  <div key={node.id}>
                    <h2 className='text-accent-7'>{node.title}</h2>
                    <p className='font-mono text-accent-5'>{node.url}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Stadistics() {
  return (
    <Root>
      <Trigger asChild>
        <button className='text-accent-5 hover:text-accent-7'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-file-chart-column size-4'
          >
            <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
            <path d='M14 2v4a2 2 0 0 0 2 2h4' />
            <path d='M8 18v-1' />
            <path d='M12 18v-6' />
            <path d='M16 18v-3' />
          </svg>
        </button>
      </Trigger>
      <Portal>
        <Overlay />
        <Content className='fixed inset-0 mx-auto z-50'>
          <Suspense fallback={null}>
            <div className='u-bg-noise size-full relative bg-background overflow-hidden mx-auto max-w-[1000px] p-3'>
              <div className='absolute size-2/4 bg-foreground/10 rounded-full pointer-events-none blur-[200px] m-auto inset-0' />
              <header
                aria-label='header'
                className='u-flex-center-between mb-4'
              >
                <Title className='text-sm uppercase animate-fade-in-blur'>
                  Stadistics
                </Title>
                <Close asChild>
                  <button
                    aria-label='Close'
                    className='hover:text-accent-5 transition-all duration-300 hover:rotate-180'
                  >
                    <X className='size-5' />
                  </button>
                </Close>
              </header>
              <section>
                <Stadisticss />
              </section>
            </div>
          </Suspense>
        </Content>
      </Portal>
    </Root>
  );
}
