'use client'

import { FIGMA_URL, GITHUB_REPOSITORY } from '@/shared/constants'
import { FigmaIcon, GithubIcon, LoaderCircleIcon, SparklesIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { HtmlHTMLAttributes, JSX, ReactNode } from 'react'

import LockButton from './LockButton'
import './style.scss'

interface IHeader extends HtmlHTMLAttributes<HTMLElement> {
  children?: Readonly<ReactNode[]> | null
}

const ThemeController = dynamic(() => import('@/shared/components/Theme'), {
  ssr: false,
  loading() {
    return <LoaderCircleIcon className='animate-spin' />
  }
})

const Header = ({ className, ...props }: IHeader): JSX.Element => {
  return (
    <header className={`${className} header`} {...props}>
      <LockButton />
      <section className='header-actions'>
        <ThemeController />
        <Link href={FIGMA_URL} target='_blank' className='header-action' rel='noopener referer'>
          <FigmaIcon />
        </Link>
        <Link href={GITHUB_REPOSITORY} target='_blank' className='header-action' rel='noopener referer'>
          <GithubIcon />
        </Link>
      </section>
    </header>
  )
}

export default Header
