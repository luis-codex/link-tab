import SearchComponent from '@app/components/SearchComponent';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useDrag } from '@app/store/useDrag';
import { lazy, Suspense } from 'react';

const CounterSelectedLazy = lazy(() => import('../../(index)/CounterSelected'));

const CounterSelectedSuspense = () => {
  const [linksSelected, handleCleanSelected] = useBookmarksStore((s) => [
    s.linksSelected,
    s.handleCleanSelected,
  ]);

  const setDragItem = useDrag((s) => s.setDragItem);

  if (!linksSelected || linksSelected.length === 0) return null;

  return (
    <Suspense fallback={null}>
      <CounterSelectedLazy
        actionClick={() => {
          setDragItem({
            type: 'bookmark',
            payload: {
              type: 'link',
            },
          });
        }}
        count={linksSelected.length}
        handleCleanSelected={handleCleanSelected}
      />
    </Suspense>
  );
};

export default function Header() {
  return (
    <header className='u-flex-center-between gap-5 h-8 mt-2 px-2'>
      <Suspense>
        <SearchComponent
          handleFilter={(value) => {
            const trim = value.trim().toLowerCase();
            const inputText = trim;
            // ` @dir[example 1] kewsmfwe @dir[example 2] ferfmkerf ds,fsdf<>

            const filteredKeywords = [
              ...(inputText.match(/@dir\[[\w\s\d-]+\]/g) || []),
              ...(inputText.match(/@dups/g) || []),
            ];

            const keywords = inputText
              // Eliminar filtros extraidos.
              .replace(/@dir\[[\w\s\d-]+\]/g, '')
              .replace(/@dups/g, '')
              .split(/\s+/)
              .filter(Boolean);

            return { filteredKeywords, keywords };
          }}
        />
      </Suspense>
      {/* <DeleteSelected /> */}
      {/* <BtnOrganizateLinksSelected /> */}
      <CounterSelectedSuspense />
    </header>
  );
}
