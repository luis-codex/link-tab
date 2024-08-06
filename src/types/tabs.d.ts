export type Windows = {
    alwaysOnTop: boolean
    focused: boolean
    height: number
    id: number
    incognito: boolean
    left: number
    state: string
    top: number
    type: string
    width: number
}

export type TabMove = {
    id?: number
    title?: string
    url?: string
    windowId: number
    groupId: number
}

export type Tabs = {
    window: Windows;
    groups: chrome.tabGroups.TabGroup[];
    tabs: (chrome.tabs.Tab & {
        groupInfo?: chrome.tabGroups.TabGroup
    })[];
}[]

export type StateTabs = {
    tabs: Tabs | null
    tabSelected: TabMove[] | null
}
export type ActionsTabsStore = {
    setTabs: (treeTabs: Tabs) => void

    toogleSelectTab: (tab: TabMove) => void
    handleCleanSelected: () => void
    verifyTabOnUpdate: () => void
}
