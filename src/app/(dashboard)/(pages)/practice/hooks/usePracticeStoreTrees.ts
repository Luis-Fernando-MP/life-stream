import RedBlackTree, { ITreeNodeData } from '@/shared/tree/RedBlackTree'
import { create } from 'zustand'

export type TUPracticeTreesData = { [key: string]: RedBlackTree }
interface TUseStoreTrees {
  trees: TUPracticeTreesData
  tails: {
    [key: string]: Array<ITreeNodeData>
  }
  setTails: (tails: TUseStoreTrees['tails']) => void
  setTrees: (tress: TUseStoreTrees['trees']) => void
}

const usePracticeStoreTrees = create<TUseStoreTrees>(set => ({
  trees: {},
  tails: {
    ejemploA: [{ id: 5 }, { id: 6 }, { id: 1 }],
    ejemploB: [{ id: 20 }],
    ejemploC: [{ id: 100 }, { id: 50 }]
  },
  setTails: tails => set({ tails }),
  setTrees: trees => set({ trees })
}))

export default usePracticeStoreTrees
