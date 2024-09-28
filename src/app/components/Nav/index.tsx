'use client'

import { acl } from '@/shared/activeClass'
import useNav from '@/shared/hooks/useNav'
import { ROUTES, firstRoutes, matchRoute } from '@/shared/routes'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import type { HtmlHTMLAttributes, JSX, ReactNode } from 'react'

import AuthButtons from '../AuthButton'
import './style.scss'

interface INav extends HtmlHTMLAttributes<HTMLElement> {
  children?: Readonly<ReactNode[]> | null
}

const Nav = ({ className, ...props }: INav): JSX.Element => {
  const { getClass, pathname, show, toggleShow } = useNav()
  const isActive = (cls: string) => acl(matchRoute({ path: cls, route: pathname }))

  return (
    <section {...props} className={`navbar-container ${className}`}>
      <button className='navbar-hamburger' onClick={toggleShow}>
        {show ? <XIcon /> : <MenuIcon />}
      </button>
      <nav className={`navbar ${getClass()}`}>
        <div className='navbar-top'>
          {firstRoutes.map(route => {
            const [tag, data] = route
            const { Icon, title, path, subPaths } = data
            return (
              <Link
                key={tag}
                className={`navbar-link ${isActive(path)} ${isActive(subPaths)} ${tag}`}
                href={path}
                title={title}
              >
                <Icon />
              </Link>
            )
          })}
        </div>
        <div className='navbar-bottom'>
          <Link
            className={`navbar-link ${isActive(ROUTES.authors.path)}`}
            href={ROUTES.authors.path}
            title={ROUTES.authors.title}
          >
            <ROUTES.authors.Icon />
          </Link>
          <AuthButtons />
        </div>
      </nav>
    </section>
  )
}

export default Nav
