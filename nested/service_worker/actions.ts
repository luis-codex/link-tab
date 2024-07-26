/* eslint-disable @typescript-eslint/no-unused-vars */

async function getTheme() {
    try {
        const result = await new Promise((resolve, reject) => {
            chrome.storage.local.get('theme-storage', (data) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(data as { 'theme-storage': string });
                }
            });
        }) as { 'theme-storage': string };

        const themeStorage = JSON.parse(result[ 'theme-storage' ]);
        const theme = themeStorage?.state?.theme || 'light';
        console.log(theme);
        return theme;
    } catch (error) {
        console.error('Error retrieving theme, defaulting to light:', error);
        return 'light';
    }
}

/**
 * Toggles the modal and sends a message to the specified tab.
 * @param tab - The tab object representing the tab to send the message to.
 */
export const toggleModal = async (tab: chrome.tabs.Tab) => {
    const payload = await getTheme();
    await chrome.tabs.sendMessage(tab.id!, { type: 'TOGGLE_MODAL', payload });
}


export const getCurrentTab = async () => {
    return await chrome.tabs.getCurrent();
}
