import { create } from 'zustand'

type State = {
    keywords: string[]
    filteredKeywords: string[]
}

type Actions = {
    setSearch: (data: State) => void
    clear: () => void
}

export const useSearchStore = create<State & Actions>((set) => ({
    keywords: [],
    filteredKeywords: [],
    setSearch: (data) => set(data),
    clear: () => set({ keywords: [], filteredKeywords: [] })
}))