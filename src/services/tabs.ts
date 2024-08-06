import { BookmarkNode } from "@app/types/bookmarks"
import { Tabs, Windows } from "@app/types/tabs"
import { toast } from "sonner"

export const createNewTab = async (url: string) => {
    try {
        if (!__ISPROD_) {
            window.open(url, '_blank', 'noopener noreferrer')
        }
        await chrome.tabs.create({ url })

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


/*TODO: prevenir fallos */
const getWindows = async (): Promise<Windows[]> => {
    return new Promise((resolve, reject) => {
        chrome.windows.getAll({}, (windows) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(windows as Windows[])
            }
        })
    })
}

/*TODO: prevenir fallos */
const getGroups = async (windowId: number): Promise<chrome.tabGroups.TabGroup[]> => {
    return new Promise((resolve, reject) => {
        chrome.tabGroups.query({ windowId }, (groups) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(groups)
            }
        })
    })
}

const getTabs = async (windowId: number): Promise<chrome.tabs.Tab[]> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ windowId }, (tabs) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(tabs)
            }
        })
    })
}

export const deleteTabs = async (tabIds: number[]) => {
    const primise = chrome.tabs.remove(tabIds)
    toast.promise(primise, {
        loading: 'Deleting tabs...',
        success: 'Tabs deleted',
        error: 'Failed to delete tabs'
    })

}


export const getTreeTabs = async (): Promise<Tabs> => {
    if (!__ISPROD_) return JSON.parse(__TABS__)
    const windows = await getWindows()
    const tree = await Promise.all(windows.map(async (window) => {
        const groups = await getGroups(window.id)
        const tabs = await getTabs(window.id)
        return {
            groups, tabs: tabs.map(tab => ({ ...tab, groupInfo: groups.find(group => group.id === tab.groupId) }))
            , window
        }
    }))
    return tree
}

export const goToTab = async (tabId?: number) => {
    try {
        if (!tabId) return false
        await chrome.tabs.update(tabId, { active: true })
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const moveTabToGroup = async (tabId: number[], groupId: number) => {
    try {
        await chrome.tabs.group({ tabIds: tabId, groupId })
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const openLinksInWindow = async (links: BookmarkNode[], windowId: number) => {
    const urls = links.map(link => link.url)

    const promise = Promise.all(urls.map(url => chrome.tabs.create({ url, windowId })))

    toast.promise(promise, {
        loading: 'Opening links...',
        success: 'Links opened',
        error: 'Failed to open links'
    })
}

export const openLinksInGroup = async (links: BookmarkNode[], windowId: number, groupId: number) => {
    const urls = links.map(link => link.url)

    const promise = Promise.all(urls.map(url => chrome.tabs.create({ url, windowId, })))
    const tabsMoved = await promise
    const tabIds = tabsMoved.map(tab => tab.id).filter(id => id !== undefined)
    const promise2 = moveTabToGroup(tabIds, groupId)

    toast.promise(promise2, {
        loading: 'Opening links...',
        success: 'Links opened',
        error: 'Failed to open links'
    })
}



/*
const getWindows = async () => {
    return new Promise((resolve, reject) => {
        chrome.windows.getAll({}, (windows) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(windows)
            }
        })
    })
}

const getGroups = async (windowId) => {
    return new Promise((resolve, reject) => {
        chrome.tabGroups.query({ windowId }, (groups) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(groups)
            }
        })
    })
}

const getTabs = async (windowId) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ windowId }, (tabs) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(tabs)
            }
        })
    })
}


 const getTreeTabs = async () => {
    const windows = await getWindows()
    const tree = await Promise.all(windows.map(async (window) => {
        const groups = await getGroups(window.id)
        const tabs = await getTabs(window.id)
        return {
            groups, tabs: tabs.map(tab => ({ ...tab, groupInfo: groups.find(group => group.id === tab.groupId) }))
            , window
        }
    }))
    return tree
}

const json = JSON.stringify(await getTreeTabs(), null, 2)

const textArea = document.createElement('textarea')
// cipia el json al portapapeles
const copyToClipboard = (json) => {
    textArea.value = json
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

copyToClipboard(json)

 */