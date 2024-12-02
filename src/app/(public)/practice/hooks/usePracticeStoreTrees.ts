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
  trees: {
    ejemplo1: RedBlackTree.fromArray([]),
    ejemplo2: RedBlackTree.fromArray([]),
    ejemplo3: RedBlackTree.fromArray([]),
    ejemplo4: RedBlackTree.fromArray([])
  },
  tails: {
    ejemplo1: [],
    ejemplo2: [],
    ejemplo3: [],
    ejemplo4: []
  },
  setTails: tails => set({ tails }),
  setTrees: trees => set({ trees })
}))

export default usePracticeStoreTrees
