import useToogle from '@app/hooks/useToogle';
import { openLinksInGroup, openLinksInWindow } from '@app/services/tabs';
import { useAI } from '@app/store/useAI';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useTabs } from '@app/store/useTabs';
import { generateObject } from 'ai';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  keywords: z
    .array(z.string())
    .describe(
      'Keywords used for generating link suggestions based on open browser tabs.'
    ),
});

export default function BtnToogleSuggestionsTabs() {
  const [toggle, handleToggle] = useToogle(false);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const windowId = searchParams.get('window');
  const groupId = searchParams.get('group');

  const allLinks = useBookmarksStore((s) => s.allLinks);

  const [tabs] = useTabs((s) => [s.tabs]);
  const getModel = useAI((s) => s.getModel);

  const currentTabs = !groupId
    ? tabs
        ?.find((t) => t.window.id === Number(windowId))
        ?.tabs.map((u) => u.url?.toLowerCase())
    : tabs
        ?.find((t) => t.window.id === Number(windowId))
        ?.tabs.map((u) => u.url?.toLowerCase());

  // useEffect(() => {
  //   if (__ISPROD_) {
  //     handlerClick();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [windowId, groupId]);

  const linksSuggestions = useMemo(() => {
    if (!keywords || keywords.length === 0 || !allLinks) return null;

    return allLinks.filter((link) => {
      const title = link.title.toLowerCase();
      const url = link.url?.toLowerCase();

      return keywords.some(
        (keyword) =>
          title.includes(keyword.toLowerCase()) ||
          url?.includes(keyword.toLowerCase())
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  const linksFiltered = useMemo(() => {
    if (!currentTabs || !linksSuggestions) return null;
    return linksSuggestions.filter((link) => {
      const url = link.url?.toLowerCase();
      return !currentTabs.includes(url);
    });
  }, [currentTabs, linksSuggestions]);

  if (!tabs || !windowId) return null;

  const getPromot = () => {
    const currentWindow = tabs.find((t) => t.window.id === Number(windowId));

    if (!groupId) {
      const data = currentWindow?.tabs.map(({ title, url }) => ({
        title: title?.substring(0, 30),
        url: url?.substring(0, 30),
      }));
      if (!data) return null;
      const json = JSON.stringify(data);

      return `Generate a list of single-word search keywords from the following tabs data, focusing on the most relevant and distinct words provided: ${json}`;
    }

    const groupName = currentWindow?.groups
      .find((g) => g.id === Number(groupId))
      ?.title?.trim();

    const data = currentWindow?.tabs
      .filter((t) => t.groupId === Number(groupId))
      .map(({ title, url }) => ({
        title: title?.substring(0, 30),
        url: url?.substring(0, 30),
      }));

    if (!groupName || !data) return null;

    const json = JSON.stringify(data);

    return `Generate a list of single-word search keywords for the group '${groupName}' from the following tabs data, emphasizing the most relevant and distinct words: ${json}`;
  };

  const handlerClick = async () => {
    const prompt = getPromot();
    console.log({ prompt });

    const model = getModel();
    if (!model) return;

    if (!prompt) return;

    try {
      setLoading(true);
      const { object } = await generateObject({
        model: model('models/gemini-1.5-flash-latest'),
        prompt,
        schema,
      });
      setKeywords(object.keywords);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-collapse={toggle} className='mt-4 px-4 w-full overflow-hidden'>
      <header
        className='u-flex-center-start gap-4 text-xs overflow-hidden'
        style={{
          maskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
        }}
      >
        <button
          className='border border-accent-2 p-1 rounded-[calc(15px-5px)] text-accent-6'
          onClick={handlerClick}
        >
          {loading ? (
            <LoaderCircle className='size-3.5 animate-spin text-accent-3' />
          ) : (
            <Sparkles className='size-4' />
          )}
        </button>

        <button
          data-collapse={toggle}
          onClick={handleToggle}
          className='data-[collapse="true"]:text-accent-6 text-nowrap'
        >
          <div
            data-collapse={toggle}
            className='data-[collapse="true"]:rotate-90 transition-transform inline-block'
          >
            ▶
          </div>
          <span className='uppercase ml-2'>recommend</span>
        </button>
      </header>

      {toggle && (
        <div className='grid gap-2 content-baseline mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {linksFiltered?.slice(0, 15)?.map((link, i) => (
            <button
              key={link.id}
              className='text-accent-6 u-flex-center-start gap-3 text-left bg-accent-2/40 text-sm font-light px-3 py-1 rounded-[calc(15px-8px)] animate-fade-up'
              style={{
                animationDelay: `${i * 100}ms`,
              }}
              title={link.url}
              onClick={() => {
                if (!groupId) {
                  openLinksInGroup([link], Number(windowId), Number(groupId));
                  return;
                }
                openLinksInWindow([link], Number(windowId));
              }}
            >
              <img src={link.favicon} className='size-3' alt='' />
              <span className='truncate'>{link.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
