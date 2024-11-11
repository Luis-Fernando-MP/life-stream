import { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'

import Histories from './components/Histories'
import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Medical: Life Stream'
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <article className='layout-container historyPages'>
      <Histories className='layout-histories animate-blurred-fade-in' />
      {children}
    </article>
  )
}

export default Layout
