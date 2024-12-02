import { PUBLIC_ROUTES } from '@/shared/routes'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
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
  const headerList = headers()
  const pathname = headerList.get('x-current-path') ?? '/'
  const isPublic = PUBLIC_ROUTES.includes(pathname)
  const { userId } = auth()
  if (!userId || isPublic) redirect('/sign-in')
  return <>{children} </>
}

export default Layout
