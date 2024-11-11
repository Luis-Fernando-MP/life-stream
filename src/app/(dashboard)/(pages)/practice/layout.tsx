'use client'

import RedBlackTree from '@/shared/tree/RedBlackTree'
import { type ReactNode, useEffect } from 'react'

import usePracticeStoreTrees, { TUPracticeTreesData } from './hooks/usePracticeStoreTrees'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout) => {
  const { tails, setTrees } = usePracticeStoreTrees()
  useEffect(() => {
    const trees: TUPracticeTreesData = {}
    Object.entries(tails).forEach(([k, v]) => {
      const newTree = RedBlackTree.fromArray(v)
      if (v.length <= 0) return
      trees[k] = newTree
    })

    setTrees(trees)
  }, [setTrees, tails])

  return <>{children}</>
}

export default Layout
