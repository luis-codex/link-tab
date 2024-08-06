import BtnToogleSuggestionsTabs from '@app/components/ai/BtnToogleSuggestionsTabs';
import { ScrollArea } from '@app/components/ui/scroll-area';
import useScrollEdgeDetection from '@app/hooks/useScrollEdgeDetection ';
import { cn } from '@app/lib/utils';
import { getFaviconUrl } from '@app/services/favicon';
import { goToTab } from '@app/services/tabs';
import { useSearchStore } from '@app/store/useSearchStore';
import { useTabs } from '@app/store/useTabs';
import { convertToPastel } from '@app/utils/colors';
import { motion } from 'framer-motion';
import { lazy, Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/header';

const useData = () => {
  const tabs = useTabs((s) => s.tabs);
  const [searchParams] = useSearchParams();
  const windowId = searchParams.get('window');
  const groupId = searchParams.get('group');

  const data =
    !windowId || !tabs
      ? null
      : groupId
      ? tabs
          .find((tab) => tab.window.id === Number(windowId))
          ?.tabs.filter((tab) => tab.groupId === Number(groupId))
      : tabs.find((tab) => tab.window.id === Number(windowId))?.tabs;
  // ?.tabs.filter((tab) => tab.groupId === -1);

  const [keywords] = useSearchStore((s) => [s.keywords]);

  const dta = useMemo(() => {
    if (!data) return null;
    const keys = [...keywords];
    return data.filter((tab) => {
      const title = tab.title?.toLowerCase();
      const url = tab.url?.toLowerCase();
      const status = tab.status?.toLowerCase();

      return keys.every((key) => {
        return (
          title?.includes(key) || url?.includes(key) || status?.includes(key)
        );
      });
    });
  }, [data, keywords]);
  return dta;
};

function ListItems() {
  const data = useData();
  const [tabSelected, toogleSelectTab] = useTabs((s) => [
    s.tabSelected,
    s.toogleSelectTab,
  ]);

  if (!data) return '404';

  return data?.map((tab) => (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { delay: Math.random() * 0.4, damping: 18 },
      }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      onClick={() =>
        toogleSelectTab({
          id: tab.id,
          title: tab.title,
          url: tab.url,
          groupId: tab.groupId,
          windowId: tab.windowId,
        })
      }
      data-is-selected={
        tabSelected?.find((t) => t.id === tab.id) ? 'true' : 'false'
      }
      className='data-[is-selected="true"]:bg-accent-6/10 text-accent-7 relative flex flex-col group py-3 p-4 data-[disabled="true"]:opacity-50 data-[disabled="true"]:pointer-events-none data-[disabled="true"]:select-none group rounded-xl'
    >
      <div className='text-accent-7/90 truncate mb-2 grid grid-cols-[auto,1fr] items-center gap-3'>
        {getFaviconUrl(tab.url) && (
          <img
            src={getFaviconUrl(tab.url)}
            alt={tab.title}
            className='size-4 inline-block'
          />
        )}
        <h3 className='truncate group-hover:text-accent-8'>{tab.title}</h3>
      </div>
      <div className='u-flex-center-start gap-3'>
        <div
          className={cn(
            'size-3 rounded-full',
            tab.status === 'complete'
              ? 'bg-green-400'
              : tab.status === 'loading'
              ? 'bg-yellow-400'
              : 'bg-red-400'
          )}
        />
        <span className='text-accent-5 font-mono text-sm'>{tab.status}</span>
      </div>

      {tab.groupInfo && (
        <div className='u-flex-center-start gap-3'>
          <div
            className='size-3 rounded-[calc(15px-11px)]'
            style={{
              backgroundColor: convertToPastel(tab.groupInfo.color),
            }}
          />
          <span className='text-accent-5 font-mono text-sm'>
            {tab.groupInfo.title || tab.groupId}
          </span>
        </div>
      )}
      {tab.url && (
        <a
          className='my-2 truncate text-sm text-accent-6  font-light italic hover:underline underline-offset-2 cursor-pointer w-fit max-w-full'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            goToTab(tab.id);
          }}
        >
          {tab.url}
        </a>
      )}
    </motion.div>
  ));
}
const BtnDeleteLazy = lazy(() => import('../(index)/BtnDelete'));

export default function Page() {
  const [ref, active] = useScrollEdgeDetection({
    selectorChild: 'div[data-radix-scroll-area-viewport]',
  });
  return (
    <div className='size-full flex flex-col'>
      <Header />
      <ScrollArea
        ref={ref}
        className='lowercase flex-1 size-full'
        style={{
          mask: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000 ${
            active.isBottom ? 0 : 10
          }%, #000 ${active.isTop ? 100 : 90}%, rgba(0, 0, 0, 0) 100%)`,
        }}
      >
        <BtnToogleSuggestionsTabs />
        <div className='size-full px-2 py-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <ListItems />
        </div>
      </ScrollArea>
      <Suspense>
        <BtnDeleteLazy />
      </Suspense>
    </div>
  );
}
