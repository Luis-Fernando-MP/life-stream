import { create } from 'zustand'

import type { BloodDonor, BloodReceiver, Doctor, Patient, Person } from './data'

interface DataStore {
  data: {
    persons: Person[]
    doctors: Doctor[]
    patients: Patient[]
    bloodDonors: BloodDonor[]
    bloodReceivers: BloodReceiver[]
  }
  setData: (newData: DataStore['data']) => void
  theme: string
  setTheme: (theme: string) => void
}

export const useDataStore = create<DataStore>(set => ({
  data: {
    persons: [],
    doctors: [],
    patients: [],
    bloodDonors: [],
    bloodReceivers: []
  },
  setData: newData => set({ data: newData }),
  theme: 'monokai',
  setTheme: theme => set({ theme })
}))
