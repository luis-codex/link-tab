import { BookmarkFolders, BookmarkList, BookmarkNode } from '@app/types/bookmarks';
import { toast } from 'sonner';
import { getFaviconUrl } from './favicon';

export const getTreeBookmarks = async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return __ISPROD_ ? chrome.bookmarks.getTree() : JSON.parse(__BOOKMARKS__)
}

export const getTreeByFolderId = async (folderId: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return __ISPROD_ ? chrome.bookmarks.getSubTree(folderId) : JSON.parse(__BOOKMARKS__)
}

export const getBookmarksByID = async (id: string) => {
    const bookmarks = await getTreeByFolderId(id);
    return flattenTreeMarkers(bookmarks);
}

export const flattenTreeMarkers = (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[]
) => {
    const links: BookmarkList[] = [];
    const Folders: BookmarkFolders[] = [];
    const ids: string[] = [];

    const urls = new Set();
    const duplicates = [];

    const emptyFolders = [];



    const set = new Map<string, string>();

    const traverse = (nodes: BookmarkNode[],) => {
        nodes.forEach((node) => {

            if (urls.has(node.url)) duplicates.push(node);
            else urls.add(node.url);


            if (node.url) {
                links.push({
                    ...node, titleParent: node.parentId && set.get(node.parentId),
                    favicon: getFaviconUrl(node.url)
                });
            } else if (node.children) {

                if (node.children.length === 0) {
                    emptyFolders.push(node);
                }

                const { children, ...folder } = node;
                Folders.push({
                    ...folder, titleParent: node.parentId && set.get(node.parentId),
                    isEmpty: children.length === 0
                });
            }

            ids.push(node.id);

            if (node.children && node.children.length > 0) {
                set.set(node.id, node.title);
                traverse(node.children);
            }
        });
    };

    traverse(bookmarks);
    return {
        links,
        Folders,
        ids

    }
};

export const moveLinksInFolder = async (linkIds: string[], folderId: string) => {
    /*id: string, destination: chrome.bookmarks.BookmarkDestinationArg*/

    const promise = () => new Promise((resolve, reject) => {
        linkIds.forEach(linkId => {
            chrome.bookmarks.move(linkId, { parentId: folderId }, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    });

    toast.promise(promise, {
        loading: 'Loading...',
        success: 'Moved links',
        error: (error) => `Error: ${error.message}`,
        duration: 1500
    });
}

export const moveFolderInFolder = async (folderId: string, destinationId: string) => {
    const promise = () => new Promise((resolve, reject) => {
        chrome.bookmarks.move(folderId, { parentId: destinationId }, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });

    toast.promise(promise, {
        loading: 'Loading...',
        success: 'Moved folder',
        error: (error) => `Error: ${error.message}`
    });
}

export const deleteBookmarks = async (bookmarkIds: string[]) => {
    const { errors, success }: {
        errors: string[];
        success: string[];
    } = { errors: [], success: [] };

    // Crear una función para manejar la eliminación de bookmarks
    const deleteBookmark = (bookmarkId: string) => {
        return new Promise((resolve, reject) => {
            chrome.bookmarks.remove(bookmarkId, () => {
                const error = chrome.runtime.lastError;
                if (error) {
                    errors.push(bookmarkId);
                    reject(error);
                } else {
                    success.push(bookmarkId);
                    resolve(bookmarkId);
                }
            });
        });
    };
    // Esperar a que todas las operaciones se completen
    const promise = Promise.all(bookmarkIds.map(deleteBookmark));

    toast.promise(promise, {
        loading: 'Loading...',
        success: () => {
            return `Deleted ${success.length} bookmarks and ${errors.length} bookmarks failed to delete`;
        },
        error: 'Error'
    });
}

export const deleteFolder = (folderId: string) => {
    const pomise = new Promise((resolve, reject) => {
        chrome.bookmarks.removeTree(folderId, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve({ message: 'Folder deleted' });
            }
        });
    });

    toast.promise(pomise, {
        loading: 'Loading...',
        success: 'Folder deleted',
        error: (error) => `Error: ${error.message}`
    });
}

export const editFolder = async (folderId: string, title: string) => {
    const promise = new Promise((resolve, reject) => {
        chrome.bookmarks.update(folderId, { title }, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });

    toast.promise(promise, {
        loading: 'Loading...',
        success: 'Folder updated',
        error: (error) => `Error: ${error.message}`
    });
}

export const createFolder = async (title: string, id: string) => {
    const promise = new Promise((resolve, reject) => {
        chrome.bookmarks.create({ title, parentId: id }, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });

    toast.promise(promise, {
        loading: 'Loading...',
        success: 'Folder created',
        error: (error) => `Error: ${error.message}`
    });
}

export const editLink = async (linkId: string, title: string, url: string) => {
    const promise = new Promise((resolve, reject) => {
        chrome.bookmarks.update(linkId, { title, url }, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });

    toast.promise(promise, {
        loading: 'Loading...',
        success: 'Link updated',
        error: (error) => `Error: ${error.message}`
    });
}


