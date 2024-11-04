import { ALL_DATA } from '@/db/hooks/keys'
import { getAllData } from '@/db/services/getAllData'
import { getQueryClient } from '@/shared/getQueryClient'
import { auth } from '@clerk/nextjs/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
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
  const queryClient = getQueryClient()

  const { userId, getToken } = auth()
  if (!userId) redirect('/sign-in')

  const token = await getToken()
  await queryClient.fetchQuery({
    queryKey: [ALL_DATA],
    queryFn: () => getAllData(token)
  })

  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
    </Suspense>
  )
}

export default Layout
