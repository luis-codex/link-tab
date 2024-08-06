import { ActionsTabsStore, StateTabs } from '@app/types/tabs';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';


export const useTabs = create(
    immer<StateTabs & ActionsTabsStore>((set) => ({
        tabs: null,
        setTabs: (tabs) => set({ tabs }),
        tabSelected: null,
        toogleSelectTab: (tab) => {
            set((state) => {
                if (state.tabSelected?.find((t) => t.id === tab.id)) {
                    state.tabSelected = state.tabSelected?.filter((t) => t.id !== tab.id)
                } else {
                    state.tabSelected = state.tabSelected ? [ ...state.tabSelected, tab ] : [ tab ]
                }
            })
        },
        handleCleanSelected: () => set((state) => { state.tabSelected = null }),
        verifyTabOnUpdate: () => {
            set((state) => {
                if (!state.tabs || !state.tabSelected) return;

                const tabIds = state.tabs.flatMap((t) => t.tabs.map((tab) => tab.id));
                state.tabSelected = state.tabSelected.filter((t) => tabIds.includes(t.id));
            });
        }

    }))
)