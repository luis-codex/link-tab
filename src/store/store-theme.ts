
import storageZustand from '@app/utils/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type Store = {
    theme: Theme
}

type Actions = {
    toggleTheme: () => void
}


// funsiom que obtiene el store del local storage.


export const useThemeStore = create(
    persist<Store & Actions>(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
        }),
        {
            name: 'theme-storage',
            skipHydration: true,
            storage: storageZustand(),
        }
    )
)
