import { createContext, useRef } from 'react';
import { createStore, StoreApi } from 'zustand';
import { StadisticsStoreState } from './types';

export const StadisticsContext =
  createContext<StoreApi<StadisticsStoreState> | null>(null);

export const StadisticsProvider = (props: { children: React.ReactNode }) => {
  const { current } = useRef(
    createStore<StadisticsStoreState>((set) => ({
      allBookmarks: [],
      allFolders: [],
      setAllBookmarks: (bookmarks) => set({ allBookmarks: bookmarks }),
      setAllFolders: (folders) => set({ allFolders: folders }),
    }))
  );

  
  return (
    <StadisticsContext.Provider value={current}>
      {props.children}
    </StadisticsContext.Provider>
  );
};
