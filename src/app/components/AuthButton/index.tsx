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

import './style.scss'

const AuthButtons = (): JSX.Element => {
  const currentPath = usePathname()
  return (
    <aside className='authUserButton'>
      <ClerkLoading>
        <div className='skeleton rounded-full' />
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
