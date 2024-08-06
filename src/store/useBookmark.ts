import { flattenTreeMarkers, getTreeByFolderId } from '@app/services/bookmarks';
import { StoreBookmarks } from '@app/types/bookmarks';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import slicePagination from './slices/slicePagination';

export const useBookmarksStore = create<StoreBookmarks>()(
    immer((set, get, state) => ({
        dataList: null,
        metadataFolder: null,
        dragItem: null,
        folders: null,

        setDataList: async (parentId) => {
            if (!parentId) {
                set((state) => {
                    state.metadataFolder = null
                    state.dataList = null
                })
                return
            }
            const tree = await getTreeByFolderId(parentId)
            const { Folders, links } = flattenTreeMarkers(tree)

            set((state) => {
                state.metadataFolder = {
                    id: tree[ 0 ].id,
                    title: tree[ 0 ].title,
                    countSubFolders: tree[ 0 ].children?.filter((b) => b.children).length || 0,
                    countSubLinks: tree[ 0 ].children?.filter((b) => !b.children).length || 0,
                    countAllLinks: links.length,
                }
                state.dataList = links;
                state.folders = Folders
            })
        },
        keysSearchList: [],

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
        setLinksSelected: (ids) => {
            set((state) => {
                state.linksSelected = ids
            })
        },

        getLinkSelected: () => {
            const { linksSelected, allLinks } = get()
            if (!linksSelected) return []
            return allLinks?.filter((l) => linksSelected.includes(l.id)) || []
        },

        bookmarksTree: null,
        allFolders: null,
        allLinks: null,
        setBookmarksTree: (bookmarks) => {
            const { Folders, links } = flattenTreeMarkers(bookmarks)
            set((state) => {
                state.bookmarksTree = bookmarks
                state.allFolders = Folders
                state.allLinks = links
            })
        },

        ...slicePagination(set, get, state),

        handleCleanSelected: () => set((state) => {
            state.linksSelected = null
        })

        ,
        deleteSelectedLink: (id) => {
            set((state) => {
                if (state.linksSelected) {
                    state.linksSelected = state.linksSelected.filter((l) => l !== id)
                }
            })
        },

        dataListIDFiltered: null,
        setDataListIDFiltered: (dataListIDFiltered) => set((state) => { state.dataListIDFiltered = dataListIDFiltered }),
        handleSelectAll: () => {
            set((state) => {
                state.handleCleanSelected()
                state.linksSelected = state.dataListIDFiltered
            })
        },

        handleCleanEmptyFolders: async () => {
            const { folders } = get()
            const emptyFolders = folders?.filter((f) => f.isEmpty)
            const ids = emptyFolders?.map((f) => f.id)
            if (ids) {
                const promises = ids.map((id) => chrome.bookmarks.removeTree(id))
                await Promise.all(promises)
            }
        }
    })),
)