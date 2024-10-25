import { create } from 'zustand'

type IMode = {
  mode: 'three' | 'array'
  setMode: (mode: IMode['mode']) => void
}

const useMode = create<IMode>(set => ({
  mode: 'array',
  setMode: mode => set({ mode })
}))

export default useMode
