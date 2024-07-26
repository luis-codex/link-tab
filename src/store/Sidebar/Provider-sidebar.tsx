import { createContext, useRef } from 'react';
import { createStore, StoreApi } from 'zustand';
import { SidebarStoreState } from './types';

export const SidebarContext = createContext<StoreApi<SidebarStoreState> | null>(
  null
);

export const SidebarProvider = (props: { children: React.ReactNode }) => {
  const { current } = useRef(
    createStore<SidebarStoreState>((set) => ({
      dataNewFolder: null,
      SetIdNewFolder: (dataNewFolder) => set({ dataNewFolder }),

      isCollapse: false,
      ToggleCollapse: () => set((state) => ({ isCollapse: !state.isCollapse })),
    }))
  );

  return (
    <SidebarContext.Provider value={current}>
      {props.children}
    </SidebarContext.Provider>
  );
};
