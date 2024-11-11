import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Dashboard: Life Stream'
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <article className='layout-container auth'>
      <div className='auth-form delay animate-blurred-fade-in'>
        <p>L I F E &nbsp; S T R E A M</p>
        {children}
      </div>
    </article>
  )
}

export default Layout
