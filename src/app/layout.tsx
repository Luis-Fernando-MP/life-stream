import { bodyFonts } from '@/shared/fonts'
import dynamic from 'next/dynamic'
import NextTopLoader from 'nextjs-toploader'
import type { JSX, ReactNode } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './components/Header'
import './globals.css'
import { metadata, viewport } from './metadata'
import Providers from './providers'
import './style.scss'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Nav = dynamic(() => import('./components/Nav'), {})
const RootLayout = ({ children }: IRootLayout): JSX.Element => {
  return (
    <html lang='es'>
      <body className={`${bodyFonts} antialiased`}>
        <NextTopLoader color='rgb(var(--tn-primary))' showSpinner={false} />
        <Providers>
          <section className='layout'>
            <Nav className='layout-nav' />
            <Header className='layout-header' />
            <main className='layout-main'>{children}</main>
          </section>
        </Providers>
        <Toaster
          position='top-center'
          toastOptions={{
            className: 'toast',
            position: 'top-right',
            style: {
              background: 'rgb(var(--bg-primary))',
              color: 'rgb(var(--fnt-primary))'
            }
          }}
        />
      </body>
    </html>
  )
}

export default RootLayout
export { metadata, viewport }
