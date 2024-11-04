import { create } from 'zustand';


type TView = 'array' | 'tree' | 'tails'


interface ISelectPerson {
  view: TView
  setView: (view: TView) => void
}

const useChartView = create<ISelectPerson>(set => ({
  view: "tails",
  setView: view => set({ view })
}))

export default useChartView