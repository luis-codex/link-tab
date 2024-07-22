import { BookmarkList, BookmarkNode } from "@app/store/store-global";
import { format, formatDistanceToNowStrict } from 'date-fns';

export const getBookmarksWithUrls = (
    bookmarks: BookmarkNode[]
) => {
    const result: BookmarkList[] = [];
    const set = new Map<string, string>();
    const traverse = (nodes: BookmarkNode[],) => {
        nodes.forEach((node) => {
            if (node.url) {
                result.push({ ...node, titleParent: node.parentId && set.get(node.parentId) });
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


export const distanceToNow = (date: string | number) => {
    return formatDistanceToNowStrict(date, { addSuffix: true });
};

export const formatMMDDYYYY = (date: string | number) => {
    return format(date, 'Pp');
};