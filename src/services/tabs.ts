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
