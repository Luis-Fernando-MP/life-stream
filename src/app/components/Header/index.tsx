'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import { GithubIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import type { HtmlHTMLAttributes, JSX, ReactNode } from 'react'

import LockButton from './LockButton'
import './style.scss'

interface IHeader extends HtmlHTMLAttributes<HTMLElement> {
  children?: Readonly<ReactNode[]> | null
}

const Header = ({ className, ...props }: IHeader): JSX.Element => {
  const { view } = useChartView()

  return (
    <header className={`${className} header`} {...props}>
      <LockButton />
      <section className='header-actions'>
        <button className='header-action'>
          <SparklesIcon />
        </button>
        <Link
          href='https://github.com/Luis-Fernando-MP/life-stream'
          target='_blank'
          className='header-action'
          rel='noopener referer'
        >
          <GithubIcon />
        </Link>
      </section>
    </header>
  )
}

export default Header
