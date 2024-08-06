import { create } from 'zustand';

export type DragItem = {
    type: 'bookmark',
    payload: { type: 'link' | 'folder', }
} | {
    type: 'tab',
    payload: { type: 'tab' | 'group' | 'window', }
}


export type StateGlobal = {
    dragItem: DragItem | null
}

export type ActionsGlobalStore = {
    setDragItem: (dragItem: DragItem | null) => void
}

export const useDrag = create<StateGlobal & ActionsGlobalStore>()(
    (set) => ({
        dragItem: null,
        setDragItem: (dragItem) => set({ dragItem })
     })
)