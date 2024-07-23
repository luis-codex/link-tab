import { getTreeBookmarks } from '@app/services/bookmarks';
import { useGlobalStore } from '@app/store/store-global';
import { useEffect } from 'react';

export default function useLoadBookmarks() {
    const SetBookmarksTree = useGlobalStore(s => s.SetBookmarksTree)

    useEffect(() => {
        const init = async () => {
            const tree = await getTreeBookmarks();
            SetBookmarksTree(tree)
        };

        init()

        if (!__ISPROD_) { return }
        const api = chrome.bookmarks;
        api.onCreated.addListener(init);
        api.onChanged.addListener(init);

        api.onRemoved.addListener(init);
        api.onMoved.addListener(init);
        api.onChildrenReordered.addListener(init);

        /* No required validation */
        api.onImportEnded.addListener(init);
        api.onImportBegan.addListener(init);

        return () => {
            api.onCreated.removeListener(init);
            api.onChanged.removeListener(init);

            api.onRemoved.removeListener(init);
            api.onMoved.removeListener(init);
            api.onChildrenReordered.removeListener(init);

            /* No required validation */
            api.onImportEnded.removeListener(init);
            api.onImportBegan.removeListener(init);
        };
    }, [ SetBookmarksTree ])
}
