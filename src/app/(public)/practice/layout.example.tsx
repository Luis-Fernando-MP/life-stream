'use client'

import RedBlackTree from '@/shared/tree/RedBlackTree'
import { type ReactNode, useEffect } from 'react'

import usePracticeStoreTrees, { TUPracticeTreesData } from './hooks/usePracticeStoreTrees'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout) => {
  const { tails, setTrees } = usePracticeStoreTrees()
  console.log('feee')

  return <>{children}</>
}

export default Layout
