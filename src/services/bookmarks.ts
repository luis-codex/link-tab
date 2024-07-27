import { BookmarkList, BookmarkNode } from '@app/store/store-global';
import { getFaviconUrl } from './favicon';

export const getTreeBookmarks = async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return __ISPROD_ ? chrome.bookmarks.getTree() : JSON.parse(__BOOKMARKS__)
}

export const getTreeByFolderId = async (folderId: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return __ISPROD_ ? chrome.bookmarks.getSubTree(folderId) : JSON.parse(__BOOKMARKS__)
}


export const getBookmarksWithUrls = (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[]
) => {
    const result: BookmarkList[] = [];
    const set = new Map<string, string>();
    const traverse = (nodes: BookmarkNode[],) => {
        nodes.forEach((node) => {
            if (node.url) {
                result.push({
                    ...node, titleParent: node.parentId && set.get(node.parentId),
                    favicon: getFaviconUrl(node.url)
                });
            }
            if (node.children && node.children.length > 0) {
                set.set(node.id, node.title);
                traverse(node.children);
            }
        });
    };
    traverse(bookmarks);
    return result;
};

export const moveLinksInFolder = async (linkIds: string[], folderId: string) => {
    /*id: string, destination: chrome.bookmarks.BookmarkDestinationArg*/
    const { erros, success }: {
        erros: string[];
        success: string[];
    } = { erros: [], success: [] };

    // Esperar a que todas las operaciones se completen
    await Promise.all(linkIds.map((linkId) => {
        chrome.bookmarks.move(linkId, { parentId: folderId })
            .then(() => success.push(linkId))
            .catch(() => erros.push(linkId));
    }));

    return { erros, success }
}

export const moveFolderInFolder = async (folderId: string, destinationId: string) => {
    try {
        await chrome.bookmarks.move(folderId, { parentId: destinationId })
        return true
    } catch (error) {
        return false
    }
}

export const deleteBookmarks = async (bookmarkIds: string[]) => {
    const { erros, success }: {
        erros: string[];
        success: string[];
    } = { erros: [], success: [] };

    // Esperar a que todas las operaciones se completen
    await Promise.all(bookmarkIds.map((bookmarkId) => {
        chrome.bookmarks.remove(bookmarkId)
            .then(() => success.push(bookmarkId))
            .catch(() => erros.push(bookmarkId));
    }));

    return { erros, success }
}

export const deleteFolder = async (folderId: string) => {
    try {
        await chrome.bookmarks.removeTree(folderId)
        return true
    } catch (error) {
        return false
    }
}
export const editFolder = async (folderId: string, title: string) => {
    try {
        await chrome.bookmarks.update(folderId, { title })
        return true
    } catch (error) {
        return false
    }
}

export const createFolder = async (title: string, id: string) => {
    try {
        const folder = await chrome.bookmarks.create({ title, parentId: id })
        return folder
    } catch (error) {
        console.log(error);
        return null
    }
}


export const editLink = async (linkId: string, title: string, url: string) => {
    try {
        await chrome.bookmarks.update(linkId, { title, url })
        return true
    } catch (error) {
        return false
    }
}


