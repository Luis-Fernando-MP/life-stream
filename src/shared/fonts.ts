import { Montserrat, Roboto, Satisfy } from 'next/font/google'

export const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700', '800', '900'],
  variable: '--font1'
})

export const RobotoFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font2'
})

export const PlayFairFont = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font3'
})

export const bodyFonts = `${MontserratFont.variable} ${RobotoFont.variable} ${PlayFairFont.variable}`
