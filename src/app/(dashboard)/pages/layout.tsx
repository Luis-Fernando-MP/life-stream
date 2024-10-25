import type { JSX, ReactNode } from 'react'

import History from '../components/Histories'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <>
      <History />
      {children}
    </>
  )
}

export default Layout
