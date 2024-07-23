type StadisticsStore = {
    allBookmarks: BookmarkList[];
    allFolders: BookmarkFolders[];
};
type StadisticsStoreActions = {
    setAllBookmarks: (bookmarks: BookmarkList[]) => void;
    setAllFolders: (folders: BookmarkFolders[]) => void;
};

export type StadisticsStoreState = StadisticsStore & StadisticsStoreActions;
