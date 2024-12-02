import { getQueryClient } from '@/shared/getQueryClient'
import { PUBLIC_ROUTES } from '@/shared/routes'
import { auth } from '@clerk/nextjs/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ReactNode, Suspense } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Dashboard: Life Stream'
}

const Layout = async ({ children }: ILayout) => {
  const headerList = headers()
  const queryClient = getQueryClient()
  const pathname = headerList.get('x-current-path') ?? '/'
  const isPublic = PUBLIC_ROUTES.includes(pathname)
  const { userId } = auth()
  if (!userId || isPublic) redirect('/sign-in')
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
    </Suspense>
  )
}

export default Layout
