import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface BookmarkNode {
    id: string;
    parentId?: string;
    titleParent?: string;
    index?: number;
    url?: string;
    title: string;
    dateAdded?: number;
    dateGroupModified?: number;
    unmodifiable?: 'managed';
    children?: BookmarkNode[];
}


export type BookmarkList = Prettify<Omit<BookmarkNode, 'children'>>

type Data = {
    id: string,
    title: string,
    countSubFolders: number,
    countSubLinks: number,
    countAllLinks: number,
    list: BookmarkList[]
}

export type StateGlobal = {
    count: number,
    data: Data | null
    keysSearchList: string[]
}

export type ActionsGlobalStore = {
    increment: (qty: number) => void,
    SetData: (bookmarks: Data) => void,
    SetKeysSearchList: (keys: string[]) => void

}

export const useGlobalStore = create<StateGlobal & ActionsGlobalStore>()(
    immer((set) => ({
        data: null,
        count: 0,
        increment: (qty: number) =>
            set((state) => {
                state.count += qty
            }),
        SetData: (data) => set((state) => { state.data = data }),
        keysSearchList: [],
        SetKeysSearchList: (keys) => set((state) => { state.keysSearchList = keys }),
    })),
)