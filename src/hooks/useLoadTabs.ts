import { getTreeTabs } from "@app/services/tabs";
import { useTabs } from "@app/store/useTabs";
import debounce from 'debounce';
import { useEffect } from "react";

export default function useLoadTabs() {
    const [ tabs, setTabs, verifyTabOnUpdate ] = useTabs((s) => [ s.tabs, s.setTabs, s.verifyTabOnUpdate ]);

    useEffect(() => {
        const handler = debounce(async () => setTabs(await getTreeTabs()), 500, { immediate: true })

        handler()
        if (!__ISPROD_) return;

        const api = chrome.tabs
        api.onCreated.addListener(handler)
        api.onUpdated.addListener(handler)
        api.onMoved.addListener(handler)
        api.onRemoved.addListener(handler)
        api.onDetached.addListener(handler)
        api.onAttached.addListener(handler)
        api.onReplaced.addListener(handler)
        api.onHighlighted.addListener(handler)
        api.onActivated.addListener(handler)

        const apiGroup = chrome.tabGroups
        apiGroup.onCreated.addListener(handler)
        apiGroup.onUpdated.addListener(handler)
        apiGroup.onRemoved.addListener(handler)
        apiGroup.onMoved.addListener(handler)
    }, [ setTabs ]);


    useEffect(() => {
        verifyTabOnUpdate()
    }, [ tabs, verifyTabOnUpdate ])

}