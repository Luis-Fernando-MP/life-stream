import { ApiAllData } from '@/app/api/all/route'
import RedBlackTree from '@/shared/tree/RedBlackTree'
import { create } from 'zustand'

interface TUseStoreTrees {
  data: {
    trees: {
      [key: string]: RedBlackTree
    }
    query: ApiAllData | null
  }
  status: 'error' | 'success' | 'pending'
  setData: (data: TUseStoreTrees['data']) => void
  setStatus: (status: TUseStoreTrees['status']) => void
}

const useStoreTrees = create<TUseStoreTrees>(set => ({
  data: { trees: {}, query: null },
  status: 'pending',
  setData: data => set({ data }),
  setStatus: status => set({ status })
}))

export default useStoreTrees
