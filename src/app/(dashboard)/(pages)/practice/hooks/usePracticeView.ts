import { create } from 'zustand'

type views = 'add' | 'remove' | 'update'
interface TUsePracticeView {
  view: views
  setView: (view: views) => void
}

const usePracticeView = create<TUsePracticeView>(set => ({
  view: 'add',
  setView: view => set({ view })
}))

export default usePracticeView
