'use client'

import useNav from '@/shared/hooks/useNav'
import { DnaIcon, HistoryIcon, MedalIcon, MenuIcon, PlusIcon, UserIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type JSX } from 'react'

import './style.scss'

const Nav = (): JSX.Element => {
  const { getClass, pathname, show, toggleShow } = useNav()
  const isActive = (cls: string) => (pathname === cls ? 'active' : '')

  return (
    <section className='navbar-container'>
      <button className='navbar-hamburger' onClick={toggleShow}>
        {show ? <XIcon /> : <MenuIcon />}
      </button>
      <nav className={`navbar ${getClass()}`}>
        <div className='navbar-top'>
          <Image src='/logo.svg' alt='Juli logo' width={20} height={20} />
          <Link className={`dsNav-item ${isActive('/add')}`} href='/add' title='Agregar donante'>
            <PlusIcon />
          </Link>
          <Link
            className={`dsNav-item ${isActive('/add')}`}
            href='/Donantes'
            title='Lista de donantes'
          >
            <HistoryIcon />
          </Link>
          <Link
            className={`dsNav-item ${isActive('/add')}`}
            href='/Donantes'
            title='Lista de donantes'
          >
            <DnaIcon />
          </Link>
        </div>
        <div className='navbar-bottom'>
          <Link
            className={`dsNav-item ${isActive('/add')}`}
            href='/Donantes'
            title='Lista de donantes'
          >
            <MedalIcon />
          </Link>
          <Link
            className={`dsNav-item ${isActive('/add')}`}
            href='/Donantes'
            title='Lista de donantes'
          >
            <UserIcon />
          </Link>
        </div>
      </nav>
    </section>
  )
}

export default Nav
