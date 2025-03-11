'use client'

import { getQueryClient } from '@/shared/getQueryClient'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'
import { type JSX, type ReactNode, useState } from 'react'

interface IProviders {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const ShowModalPersonData = dynamic(() => import('@/shared/ShowModalPersonData'), {
  ssr: false
})

const Providers = ({ children }: IProviders): JSX.Element => {
  const [queryClient] = useState(getQueryClient())

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ShowModalPersonData />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default Providers
