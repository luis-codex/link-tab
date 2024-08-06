/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAI } from '@app/store/useAI';
import { useTabs } from '@app/store/useTabs';
import debounce from '@app/utils/debounce';
import { usePreferredLanguage } from '@uidotdev/usehooks';
import { generateObject } from 'ai';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z
  .object({
    result: z.array(
      z
        .object({
          categoryName: z
            .string()
            .describe('The name of the category for the tabs.'),
          windowsId: z
            .number()
            .optional()
            .describe(
              'The unique identifier of the window containing the tabs, if applicable.'
            ),
          color: z
            .string()
            .optional()
            .describe('The color associated with the tab category.'),

          tabs: z.array(
            z
              .object({
                id: z.number().describe('The unique identifier of the tab.'),
              })
              .describe('Detailed information about each tab.')
          ),
        })
        .describe(
          'Detailed information about each tab category including its tabs.'
        )
    ),
  })
  .describe('Main structure containing results organized by categories.');

export default function BtnOrganizateTabs({
  windowsId,
}: {
  windowsId: number;
}) {
  const [loading, setLoading] = useState(false);
  const language = usePreferredLanguage();
  const getModel = useAI((s) => s.getModel);
  const tabs = useTabs((s) => s.tabs);

  const handlerClick = debounce(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const model = getModel();
      if (!model) return;

      const dataTabs = {
        windowsId: windowsId,
        tabs: tabs
          ?.find((tab) => tab.window.id === windowsId)
          ?.tabs.map((tab) => ({
            id: tab.id || 0,
            title: tab.title?.substring(0, 30) || '',
            url: tab.url?.substring(0, 30) || '',
          })),
      };

      if (!dataTabs.tabs || dataTabs.tabs.length === 0) {
        toast.error('No tabs to organize');
        return;
      }

      try {
        setLoading(true);
        const {
          object: { result },
        } = await generateObject({
          model: model('models/gemini-1.5-flash-latest'),
          schema,
          // prompt: `Organize the provided tabs into their respective categories based on content and usage. The category names should be in the language specified by the 'lang' variable. Categories should reflect the primary function or theme of each tab. Please use one of the following plain text colors for each category: blue, cyan, green, grey, orange, pink, purple, red, yellow. Here is the tabs data: ${JSON.stringify(
          //   dataTabs
          // )}, and the specified language is: ${language}`,
          prompt: `Organize the provided tabs into their respective categories based on the implied profession or activity from their content. The category names should be in the language specified by the 'lang' variable. Use insights from the tab titles and URLs to determine the primary function or theme, and assign a color from the following options: blue, cyan, green, grey, orange, pink, purple, red, yellow. Here is the tabs data: ${JSON.stringify(
            dataTabs
          )}, and the specified language is: ${language}`,
        });

        console.log(result);

        if (__ISPROD_) {
          result.forEach(async (group) => {
            try {
              const groupId = await chrome.tabs.group({
                tabIds: group.tabs.map((tab) => tab.id),
                createProperties: { windowId: group.windowsId },
              });

              chrome.tabGroups.update(groupId, {
                collapsed: true,
                title: group.categoryName,
                color: group.color as any,
              });
            } catch (error) {
              toast.error('Failed moving tabs to groups');
            }
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to organize tabs');
      } finally {
        setLoading(false);
      }
    },
    500,
    { immediate: true }
  );

  return (
    <button
      onClick={handlerClick}
      disabled={loading}
      className='u-flex-center-start gap-2 border border-dashed py-1.5 px-2 rounded-[calc(15px-8px)] text-accent-3 hover:text-accent-8 border-accent-2'
    >
      {loading ? (
        <LoaderCircle className='size-3.5 animate-spin text-accent-3' />
      ) : (
        <Sparkles className='size-3.5' />
      )}
    </button>
  );
}
