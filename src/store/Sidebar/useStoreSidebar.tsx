import { useContext } from 'react';
import { useStore } from 'zustand';
import { SidebarContext } from './Provider-sidebar';
import { SidebarStoreState } from './types';

export default function useStoreSidebar<TSelected>(
  selector: (state: SidebarStoreState) => TSelected
) {
  const store = useContext(SidebarContext);
  if (!store)
    throw new Error(
      'Missing SidebarProvider, did you forget to wrap your component tree with it?'
    );
  return useStore(store, selector);
}
