import SearchComponent from '@app/components/SearchComponent';
import { useDrag } from '@app/store/useDrag';
import { useTabs } from '@app/store/useTabs';
import { lazy, Suspense } from 'react';

const CounterSelectedLazy = lazy(() => import('../../(index)/CounterSelected'));

const CounterSelectedSuspense = () => {
  const [linksSelected, handleCleanSelected] = useTabs((s) => [
    s.tabSelected,
    s.handleCleanSelected,
  ]);
  const setDragItem = useDrag((s) => s.setDragItem);
  if (!linksSelected || linksSelected.length === 0) return null;

  return (
    <Suspense fallback={null}>
      <CounterSelectedLazy
        actionClick={() =>
          setDragItem({
            type: 'tab',
            payload: { type: 'tab' },
          })
        }
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

            const filteredKeywords = [
              ...(inputText.match(/@load\[[\w\s\d-]+\]/g) || []),
            ];

            const keywords = inputText
              .replace(/@load\[[\w\s\d-]+\]/g, '')
              .split(/\s+/)
              .filter(Boolean);

            return { filteredKeywords, keywords };
          }}
        />
      </Suspense>
      {/* <DeleteSelected /> */}
      <CounterSelectedSuspense />
    </header>
  );
}
