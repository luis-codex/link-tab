import { moveLinksInFolder } from '@app/services/bookmarks';
import { useAI } from '@app/store/useAI';
import { useBookmarksStore } from '@app/store/useBookmark';
import { usePreferredLanguage } from '@uidotdev/usehooks';
import { generateObject } from 'ai';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  result: z
    .array(
      z
        .object({
          titleFolder: z
            .string()
            .optional()
            .describe(
              'The title or name of the folder where bookmarks will be organized. This field is only included if the folder is new.'
            ),

          id: z
            .string()
            .optional()
            .describe(
              'The ID of the folder, included only if it is an existing folder.'
            ),

          bookmarksIDs: z
            .array(z.string())
            .describe(
              'An array of IDs representing the bookmarks assigned to this folder.'
            ),
        })
        .describe(
          'Detailed information about each folder, including its title (if new), ID (if existing), and the bookmarks it contains.'
        )
    )
    .describe(
      'An array of objects, each representing a folder and its associated bookmarks, organized by categories based on content and usage.'
    ),
});

export default function BtnOrganizateLinksSelected() {
  const language = usePreferredLanguage();
  const [loading, setLoading] = useState(false);
  const getModel = useAI((s) => s.getModel);
  const [
    folders,
    linksSelected,
    dataList,
    metadataFolder,
    handleCleanEmptyFolders,
  ] = useBookmarksStore((s) => [
    s.folders,
    s.linksSelected,
    s.dataList,
    s.metadataFolder,
    s.handleCleanEmptyFolders,
  ]);

  if (
    !linksSelected ||
    !dataList ||
    linksSelected.length === 0 ||
    dataList.length === 0
  )
    return null;

  const handlerClick = async () => {
    const model = getModel();
    if (!model) return;

    const data = {
      folders: folders
        ?.filter(({ parentId }) => metadataFolder?.id === parentId)
        ?.map(({ title, id }) => ({ title, id })),

      bookmarks: dataList
        ?.filter(({ id }) => linksSelected?.includes(id))
        .map(({ id, title, url }) => ({
          id,
          url: (url || '').substring(0, 30),
          title: (title || '').substring(0, 30),
        }))
        .slice(0, 90),
    };

    if (data.bookmarks.length === 0) {
      toast.error('No bookmarks selected');
      return;
    }

    console.log(data);

    try {
      setLoading(true);
      const {
        object: { result },
      } = await generateObject({
        model: model('models/gemini-1.5-flash-latest'),
        schema,
        prompt: `Organize the provided bookmarks into their respective categories based on content and usage. Create new folders if necessary, but do not assign a parent ID to new categories. If adding bookmarks to existing parent folders, use only the parent ID and exclude the title. The category names should be in the language specified by the 'lang' variable. Categories should reflect the primary function or theme of each bookmark. Here is the bookmarks data: ${JSON.stringify(
          data
        )}, and the specified language is: ${language}`,
      });

      console.log(result);

      if (!__ISPROD_) {
        const promises = result.map(
          async ({ bookmarksIDs, titleFolder, id }) => {
            if (id) {
              await moveLinksInFolder(bookmarksIDs, id);
            } else if (metadataFolder?.id) {
              const folder = await chrome.bookmarks.create({
                title: titleFolder,
                parentId: metadataFolder.id,
              });
              await moveLinksInFolder(bookmarksIDs, folder.id);
              await handleCleanEmptyFolders();
              await handleCleanEmptyFolders();
            }
          }
        );

        await Promise.all(promises);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to organize bookmarks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlerClick}
      disabled={loading}
      className='u-flex-center-start gap-2 border border-dashed py-1.5 px-2 rounded-[calc(15px-8px)] text-accent-3 hover:text-accent-8 border-accent-2'
    >
      <span className='text-xs text-nowrap'>max 90</span>
      {loading ? (
        <LoaderCircle className='size-3.5 animate-spin text-accent-3' />
      ) : (
        <Sparkles className='size-3.5' />
      )}
    </button>
  );
}
