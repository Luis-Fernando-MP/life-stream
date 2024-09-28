'use client'

import { ROUTES, matchRoute } from '@/shared/routes'
import { useUser } from '@clerk/nextjs'
import { AmbulanceIcon, LockKeyhole } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

const LockButton = (): JSX.Element => {
  const route = usePathname()
  const user = useUser()
  const currentTag = Object.values(ROUTES).find(r => {
    const { path, subPaths } = r
    return matchRoute({ path, route }) || matchRoute({ path: subPaths, route })
  })
  return (
    <div className='header-lockButton'>
      {currentTag?.title}
      {user?.isSignedIn ? <AmbulanceIcon /> : <LockKeyhole />}
    </div>
  )
}

export default LockButton
