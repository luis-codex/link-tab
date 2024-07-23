
/**
 * Toggles the modal and sends a message to the specified tab.
 * @param tab - The tab object representing the tab to send the message to.
 */
export const toggleModal = async (tab: chrome.tabs.Tab) => {
    const payload = (await chrome.storage.local.get('ALIGHT_MODAL'))?.ALIGHT_MODAL as string ?? 'center'
    await chrome.tabs.sendMessage(tab.id!, { type: 'TOGGLE_MODAL', payload });
}


export const getCurrentTab = async () => {
    return await chrome.tabs.getCurrent();
}

export const setAlign = (align: 'left' | 'right' | 'center') => {
    chrome.storage.local.set({ ALIGHT_MODAL: align });
};