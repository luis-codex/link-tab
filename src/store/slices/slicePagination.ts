import {
  errorValues,
  pagination,
  type PaginationReturns,
} from '@app/utils/pagination';
import { type StateCreator } from 'zustand';

export interface IPaginationState extends PaginationReturns {
  itemsPerPage: number;
  SetCountList: (total: number) => void;
  SetItemsPerPage: (itemsPerPage: number) => void;
  goToPage: (pageNumber: number) => void;

  next: () => void;
  prev: () => void;
  start: () => void;
  last: () => void;
}

/**
 * Creates a pagination state slice.
 * @param set - The function used to update the state.
 * @returns The pagination state slice.
 */
export const slicePagination: StateCreator<IPaginationState> = (set) => ({
  ...errorValues,
  itemsPerPage: 100,
  /**
   * Updates the total number of items and recalculates the pagination.
   * @param total - The total number of items.
   */
  SetCountList(total) {
    set(({ itemsPerPage, currentPage }) => {
      return pagination({ itemsPerPage, currentPage, totalItems: total });
    });
  },
  /**
   * Updates the number of items per page and recalculates the pagination.
   * @param itemsPerPage - The number of items per page.
   */
  SetItemsPerPage(itemsPerPage) {
    set(({ totalItemsOnPages: totalItems, currentPage }) => {
      return pagination({ totalItems, currentPage, itemsPerPage });
    });
  },
  /**
   * Navigates to the specified page number and recalculates the pagination.
   * @param pageNumber - The page number to navigate to.
   */
  goToPage(pageNumber) {
    set(({ totalItemsOnPages: totalItems, itemsPerPage }) => {
      return pagination({ totalItems, itemsPerPage, currentPage: pageNumber });
    });
  },

  next() {
    set(({ totalItemsOnPages: totalItems, itemsPerPage, currentPage }) => {
      return pagination({
        totalItems,
        itemsPerPage,
        currentPage: currentPage + 1,
      });
    });
  },
  prev() {
    set(({ totalItemsOnPages: totalItems, itemsPerPage, currentPage }) => {
      return pagination({
        totalItems,
        itemsPerPage,
        currentPage: currentPage - 1,
      });
    });
  },
  start() {
    set(({ itemsPerPage, totalItemsOnPages: totalItems }) => {
      return pagination({ itemsPerPage, currentPage: 1, totalItems });
    });
  },
  last() {
    set(({ itemsPerPage, totalItemsOnPages: totalItems, pages }) => {
      return pagination({ itemsPerPage, currentPage: pages, totalItems });
    });
  },
});

export default slicePagination;
