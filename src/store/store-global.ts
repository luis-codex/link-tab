import { getBookmarksWithUrls, getTreeByFolderId } from '@app/services/bookmarks';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import slicePagination, { IPaginationState } from './slices/slicePagination';

type DragItem = {
    type: 'folder',
    id: string,
}

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
    favicon?: string;
}


export type BookmarkList = Prettify<Omit<BookmarkNode, 'children'>>
export type BookmarkFolders = Prettify<Omit<BookmarkNode, 'url'>>


type MetadataFolder = {
    id: string,
    title: string,
    countSubFolders: number,
    countSubLinks: number,
    countAllLinks: number,
}

export type StateGlobal = {
    count: number,
    metadataFolder: MetadataFolder | null
    dataList: BookmarkList[] | null
    bookmarksTree: chrome.bookmarks.BookmarkTreeNode[] | null
    linksSelected: string[] | null
    keysSearchList: string[]
    dragItem: DragItem | null
}

export type ActionsGlobalStore = {
    increment: (qty: number) => void,
    SetDataList: (parentId?: string) => void,
    SetKeysSearchList: (keys: string[]) => void
    SetDragItem: (dragItem: DragItem | null) => void
    toggleSelectLink: (id?: string) => void
    SetBookmarksTree: (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => void
}

export const useGlobalStore = create<StateGlobal & ActionsGlobalStore & IPaginationState>()(
    immer((set, get, state) => ({
        dataList: null,
        metadataFolder: null,
        dragItem: null,
        count: 0,
        increment: (qty: number) =>
            set((state) => { state.count += qty }),
        SetDataList: async (parentId) => {
            if (!parentId) {
                set((state) => {
                    state.metadataFolder = null
                    state.dataList = null
                })
                return
            }
            const tree = await getTreeByFolderId(parentId)
            const list = getBookmarksWithUrls(tree)

            set((state) => {
                state.metadataFolder = {
                    id: tree[ 0 ].id,
                    title: tree[ 0 ].title,
                    countSubFolders: tree[ 0 ].children?.filter((b) => b.children).length || 0,
                    countSubLinks: tree[ 0 ].children?.filter((b) => !b.children).length || 0,
                    countAllLinks: list.length,
                }
                state.dataList = list;
            })
        },
        keysSearchList: [],
        SetKeysSearchList: (keys) => set((state) => { state.keysSearchList = keys }),
        SetDragItem: (dragItem) => set((state) => { state.dragItem = dragItem }),

        linksSelected: null,
        toggleSelectLink: (id) => {
            set((state) => {
                if (id) {
                    if (state.linksSelected?.includes(id)) {
                        state.linksSelected = state.linksSelected?.filter((l) => l !== id)
                    } else {
                        state.linksSelected = state.linksSelected ? [ ...state.linksSelected, id ] : [ id ]
                    }
                }
            })
        },

        bookmarksTree: null,
        SetBookmarksTree: (bookmarks) => set((state) => { state.bookmarksTree = bookmarks }),

        ...slicePagination(set, get, state),

    })),
)