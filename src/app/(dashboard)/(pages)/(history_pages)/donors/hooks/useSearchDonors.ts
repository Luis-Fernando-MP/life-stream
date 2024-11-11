import { create } from 'zustand'

interface TUseSearchDonors {
  donors: any
  setDonors: (donors: any) => void
}

const useSearchDonors = create<TUseSearchDonors>(set => ({
  donors: [],
  setDonors: donors => set({ donors })
}))

export default useSearchDonors
