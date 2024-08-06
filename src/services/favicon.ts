import imgVite from '/logo.svg';

/**
 * Returns the URL of the favicon for a given page URL.
 * @param pageUrl - The URL of the page.
 * @returns The URL of the favicon as a string.
 */
export function getFaviconUrl(pageUrl: string | undefined): string {
    try {
        if (!__ISPROD_) return imgVite
        if (pageUrl === undefined) return '';
        const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'));
        faviconUrl.searchParams.set('pageUrl', pageUrl);
        faviconUrl.searchParams.set('size', '32');
        return faviconUrl.toString() || '';
    } catch (error) {
        return '';
    }
}
