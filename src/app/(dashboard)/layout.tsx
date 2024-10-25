import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Dashboard: Life Stream'
}

const Layout = ({ children }: ILayout): JSX.Element => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return <article className='layout-container dashboard'>{children}</article>
}

export default Layout
