import { MontserratFont, PlayFairFont, RobotoFont } from '@/shared/fonts'
import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import Firefly from './components/Firefly'
import Header from './components/Header'
import Nav from './components/Nav'
import './globals.css'
import Providers from './providers'
import './style.scss'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Life Stream',
  description: 'Aplicación gestión de donantes de sangre',
  icons: {
    icon: [
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' }
    ]
  }
}

const RootLayout = ({ children }: IRootLayout): JSX.Element => {
  return (
    <html lang='es'>
      <body className={`${MontserratFont.variable} ${RobotoFont.variable} ${PlayFairFont.variable}`}>
        <Providers>
          <section className='layout'>
            <Nav className='layout-nav' />
            <Header className='layout-header' />
            <main className='layout-main'>{children}</main>
          </section>
          <Firefly />
        </Providers>
        <Toaster
          position='top-center'
          toastOptions={{
            className: 'toast',
            position: 'top-center',
            style: {
              background: 'rgba(var(--bg-primary), 0.9)',
              color: 'rgb(var(--fnt-primary))'
            },
            duration: 2000
          }}
        />
      </body>
    </html>
  )
}

export default RootLayout
