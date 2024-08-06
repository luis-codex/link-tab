import { IPaginationState } from "@app/store/slices/slicePagination";

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
export type BookmarkFolders = Prettify<Omit<BookmarkNode, 'url'>> & { isEmpty: boolean }

type MetadataFolder = {
    id: string,
    title: string,
    countSubFolders: number,
    countSubLinks: number,
    countAllLinks: number,
}

export type SliceBookmarks = {
    metadataFolder: MetadataFolder | null
    dataList: BookmarkList[] | null
    dataListIDFiltered: string[] | null
    bookmarksTree: chrome.bookmarks.BookmarkTreeNode[] | null
    linksSelected: string[] | null
    folders: BookmarkFolders[] | null

    allLinks: BookmarkList[] | null
    allFolders: BookmarkFolders[] | null

    // foldersSelected: string[] | null
}


export type ActionsStoreBookmarks = {
    setDataList: (parentId?: string) => void,
    setBookmarksTree: (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => void
    setDataListIDFiltered: (dataListIDFiltered: string[]) => void

    deleteSelectedLink: (id: string) => void
    toggleSelectLink: (id?: string) => void

    handleCleanSelected: () => void
    handleSelectAll: () => void
    setLinksSelected: (ids: string[]) => void
    getLinkSelected: () => BookmarkList[]

    // toggleSelectFolder: (id?: string) => void
    // handleCleanSelectedFolders: () => void

    // eliminador de carpetas vacias.
    handleCleanEmptyFolders: () => Promise<void>
}

export type StoreBookmarks = SliceBookmarks & IPaginationState & ActionsStoreBookmarks
