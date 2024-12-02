import { create } from 'zustand'

export enum ESelectPerson {
  DOC = 'Doctor',
  PAT = 'Patient',
  DON = 'BloodDonor',
  REC = 'bloodReceiver'
}

export interface ISelectPersonTreeNode {
  type: ESelectPerson
  [key: string]: any
}

interface ISelectPerson {
  person: ISelectPersonTreeNode | null
  setPerson: (person: ISelectPerson['person']) => void
}

const useSelectPerson = create<ISelectPerson>(set => ({
  person: null,
  setPerson: person => set({ person })
}))

export default useSelectPerson
