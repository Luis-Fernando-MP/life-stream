import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUseThemeStoreStore {
  theme: 'light' | 'dark' | null
  setTheme: (theme: 'light' | 'dark' | null) => void
}

const state: StateCreator<IUseThemeStoreStore> = set => ({
  theme: null,
  setTheme: theme => set({ theme })
})

const UseThemeStoreStore = create(persist(state, { name: 'theme-app' }))

export default UseThemeStoreStore
