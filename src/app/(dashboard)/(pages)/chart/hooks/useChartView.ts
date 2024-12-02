import { create } from 'zustand'

type TView = 'array' | 'tree' | 'search'

interface ISelectPerson {
  view: TView
  setView: (view: TView) => void
}

const useChartView = create<ISelectPerson>(set => ({
  view: 'tree',
  setView: view => set({ view })
}))

export default useChartView
