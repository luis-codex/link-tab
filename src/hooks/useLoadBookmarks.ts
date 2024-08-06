/* eslint-disable react-hooks/exhaustive-deps */
import { flattenTreeMarkers, getTreeBookmarks } from '@app/services/bookmarks';
import { useBookmarksStore } from '@app/store/useBookmark';
import debounce from 'debounce';
import { useEffect } from 'react';

export default function useLoadBookmarks() {
    const [ setBookmarksTree, setLinksSelected, linksSelected, bookmarksTree ] = useBookmarksStore(s => [ s.setBookmarksTree, s.setLinksSelected, s.linksSelected, s.bookmarksTree ])

    useEffect(() => {
        const init = debounce(async () => {
            const tree = await getTreeBookmarks();
            setBookmarksTree(tree)
        }, 500, { immediate: true })

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
    }, [ setBookmarksTree ])

    useEffect(() => {
        if (!bookmarksTree) return
        if (!linksSelected || linksSelected.length === 0) return
        const { ids } = flattenTreeMarkers(bookmarksTree)
        const linksExist = linksSelected.filter((id) => ids.includes(id))
        setLinksSelected(linksExist)
    }, [ bookmarksTree ])

}
