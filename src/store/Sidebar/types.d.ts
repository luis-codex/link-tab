type DataNewFolder = {
    id: string;
    title: string;
    type: 'edit'
} | { id: string; type: 'new' } | null;

type SidebarStore = {
    dataNewFolder: DataNewFolder;
    isCollapse: boolean;
};

type SidebarStoreActions = {
    SetIdNewFolder: (dataNewFolder: DataNewFolder) => void;
    ToggleCollapse: () => void;
};

export type SidebarStoreState = SidebarStore & SidebarStoreActions;
