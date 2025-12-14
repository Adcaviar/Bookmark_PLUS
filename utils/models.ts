export class BookmarkInfo {
    id?: string | undefined = "";
    parentId?: string | undefined;
    index?: number | undefined;
    url?: string | undefined;
    title: string = "";
    dateAdded?: number | undefined;
    dateGroupModified?: number | undefined;
    unmodifiable?: "managed" | undefined;
    type?: "bookmark" | "folder" | "separator" | undefined;
    children?: BookmarkInfo[] | undefined;
    public constructor(title: string, url?: string, children?: BookmarkInfo[]) {
        this.title = title;
        this.url = url;
        this.children = children;
    }
}
export class SyncDataInfo {
    browser: string = "chrome";
    version: string = "1.0.0";
    createDate: number = Date.now();
    bookmarks: BookmarkInfo[] | undefined = [];
}

export enum BrowserType { FIREFOX, CHROME, EDGE }
export enum OperType { NONE, SYNC, CHANGE, CREATE, MOVE, REMOVE }
export enum RootBookmarksType { MenuFolder = "MenuFolder", ToolbarFolder = "ToolbarFolder", UnfiledFolder = "UnfiledFolder", MobileFolder = "MobileFolder" }
export const rootBookmarks: BookmarkInfo[] = [
    {
        "id": "menu________",//书签菜单
        "parentId": "0",
        "title": RootBookmarksType.MenuFolder,
        children: []
    }, {
        "id": "toolbar_____",//书签工具栏
        "parentId": "0",
        "title": RootBookmarksType.ToolbarFolder,
        children: []
    }, {
        "id": "unfiled_____",//其它书签
        "parentId": "0",
        "title": RootBookmarksType.UnfiledFolder,
        children: []
    }, {
        "id": "mobile______",//移动设备书签
        "parentId": "0",
        "title": RootBookmarksType.MobileFolder,
        children: []
    }];


export namespace Bookmarks {
    /**
 * Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured
 * by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user
 * and the extension (default).
 */
    type BookmarkTreeNodeUnmodifiable = "managed";

    /**
     * Indicates the type of a BookmarkTreeNode, which can be one of bookmark, folder or separator.
     */
    type BookmarkTreeNodeType = "bookmark" | "folder" | "separator";

    /**
     * A node (either a bookmark or a folder) in the bookmark tree.  Child nodes are ordered within their parent folder.
     */
    export interface BookmarkTreeNode {
        /**
         * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the
         * browser is restarted.
         */
        id: string;

        /**
         * The <code>id</code> of the parent folder.  Omitted for the root node.
         * Optional.
         */
        parentId?: string;

        /**
         * The 0-based position of this node within its parent folder.
         * Optional.
         */
        index?: number;

        /**
         * The URL navigated to when a user clicks the bookmark. Omitted for folders.
         * Optional.
         */
        url?: string;

        /**
         * The text displayed for the node.
         */
        title: string;

        /**
         * When this node was created, in milliseconds since the epoch (<code>new Date(dateAdded)</code>).
         * Optional.
         */
        dateAdded?: number;

        /**
         * When the contents of this folder last changed, in milliseconds since the epoch.
         * Optional.
         */
        dateGroupModified?: number;

        /**
         * Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured
         * by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user
         * and the extension (default).
         * Optional.
         */
        unmodifiable?: BookmarkTreeNodeUnmodifiable;

        /**
         * Indicates the type of the BookmarkTreeNode, which can be one of bookmark, folder or separator.
         * Optional.
         */
        type?: BookmarkTreeNodeType;

        /**
         * An ordered list of children of this node.
         * Optional.
         */
        children?: BookmarkTreeNode[];
    }
}
