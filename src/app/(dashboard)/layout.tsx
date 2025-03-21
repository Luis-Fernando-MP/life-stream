import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Dashboard: Life Stream'
}

const Layout = async ({ children }: ILayout) => {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return <>{children} </>
}

export default Layout
