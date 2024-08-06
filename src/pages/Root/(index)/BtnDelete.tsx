import { deleteBookmarks } from '@app/services/bookmarks';
import { deleteTabs } from '@app/services/tabs';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useDrag } from '@app/store/useDrag';
import { useTabs } from '@app/store/useTabs';
import { motion } from 'framer-motion';

export default function BtnDelete() {
  const [dragItem, setDragItem] = useDrag((s) => [s.dragItem, s.setDragItem]);

  const [handleCleanSelected, linksSelected] = useBookmarksStore((s) => [
    s.handleCleanSelected,
    s.linksSelected,
  ]);

  const [handleCleanSelectedTabs, tabSelected] = useTabs((s) => [
    s.handleCleanSelected,
    s.tabSelected,
  ]);

  if (!dragItem) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={() => {
        switch (dragItem.type) {
          case 'bookmark': {
            switch (dragItem?.payload.type) {
              case 'link':
                {
                  if (linksSelected) deleteBookmarks(linksSelected);
                }
                break;
            }
            handleCleanSelected();
            break;
          }
          case 'tab': {
            switch (dragItem?.payload.type) {
              case 'tab':
                {
                  if (tabSelected) {
                    const ids = tabSelected.map((t) => t.id!).filter(Boolean);
                    if (ids.length) deleteTabs(ids);
                  }
                }
                break;
            }
            handleCleanSelectedTabs();
            break;
          }
          default:
            break;
        }
        setDragItem(null);
      }}
      className='fixed inset-x-0 z-50 size-16 border p-4 border-red-700/50 bg-[#190606] rounded-full bottom-4 mx-auto group text-red-600/90 hover:duration-300 outline-none'
    >
      <div className='absolute group-hover:hidden size-full bg-red-500/20 animate-ping inset-0 scale-50 rounded-full z-[-1]' />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 69 14'
        className='duration-300 group-hover:scale-125 origin-bottom-right group-hover:duration-500 group-hover:rotate-[160deg] text-red-700'
      >
        <g clipPath='url(#clip0_35_24)'>
          <path
            fill='currentColor'
            d='M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z'
          ></path>
        </g>
        <defs>
          <clipPath id='clip0_35_24'>
            <rect fill='white' height='14' width='69'></rect>
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 69 57'
        className='duration-300 group-hover:scale-125 text-red-700/60'
      >
        <g clipPath='url(#clip0_35_22)'>
          <path
            fill='currentColor'
            d='M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z'
          ></path>
        </g>
        <defs>
          <clipPath id='clip0_35_22'>
            <rect fill='white' height='57' width='69'></rect>
          </clipPath>
        </defs>
      </svg>
    </motion.button>
  );
}
