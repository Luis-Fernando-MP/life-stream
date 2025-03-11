'use client'

import { ROUTES, matchRoute } from '@/shared/routes'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

const LockButton = (): JSX.Element => {
  const route = usePathname()
  const user = useUser()

  const tag = Object.values(ROUTES).find(r => {
    const { path, subPaths } = r
    return matchRoute({ path, route }) || matchRoute({ path: subPaths, route })
  })

  const showLoginLink = !user?.isSignedIn && tag?.path !== '/sign-in' && tag?.path !== '/sign-up'

  return (
    <div className='header-lock'>
      <h5>Life Stream / {tag?.title}</h5>
      {showLoginLink && (
        <Link href={'/sign-in'} className='header-lock__link'>
          / Inicia sesión
        </Link>
      )}
    </div>
  )
}

export default LockButton
