'use client'

import { type JSX, useLayoutEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

import UseThemeStoreStore from './UseThemeStoreStore'

const ThemeController = (): JSX.Element => {
  const { theme, setTheme } = UseThemeStoreStore()
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const darkChecked = theme ? theme !== 'dark' : !prefersDark

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !theme) return
    document.documentElement.setAttribute('data-theme', theme)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [setTheme])

  const toggleTheme = (checked: boolean): void => {
    const newTheme = checked ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }

  return <DarkModeSwitch checked={darkChecked} onChange={toggleTheme} size={120} sunColor='#F5B027' moonColor='#705335' />
}

export default ThemeController
