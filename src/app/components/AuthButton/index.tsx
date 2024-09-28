'use client'

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type JSX } from 'react'

const AuthButtons = (): JSX.Element => {
  const currentPath = usePathname()
  return (
    <aside className='authOptions'>
      <ClerkLoading>
        <div className='skeleton h-12 w-32' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode='modal'
            forceRedirectUrl={currentPath}
            fallbackRedirectUrl={currentPath}
            signUpFallbackRedirectUrl={currentPath}
            signUpForceRedirectUrl={currentPath}
          >
            <UserIcon />
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </aside>
  )
}

export default AuthButtons
