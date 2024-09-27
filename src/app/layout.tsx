import { MontserratFont, PlayFairFont, RobotoFont } from '@/shared/fonts'
import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Nav from './components/Nav'
// import './globals.css'
// import './index.scss'
import Providers from './providers'

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

const RootLayout = async ({ children }: IRootLayout): Promise<JSX.Element> => {
  return (
    <html lang='es'>
      <body
        className={`${MontserratFont.variable} ${RobotoFont.variable} ${PlayFairFont.variable}`}
      >
        <Providers>
          <Nav />
          <main>{children}</main>
        </Providers>
        <Toaster position='top-center' reverseOrder />
      </body>
    </html>
  )
}

export default RootLayout
