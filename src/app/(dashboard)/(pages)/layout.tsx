import { prisma } from '@/db'
import type { JSX, ReactNode } from 'react'

import History from './components/History'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = async ({ children }: ILayout): JSX.Element => {
  const histories = await prisma.queryHistory.findMany()
  return (
    <>
      {/* <History  history={histories} /> */}
      {children}
    </>
  )
}

export default Layout
