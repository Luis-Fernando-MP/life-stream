'use client'

import { acl } from '@/shared/activeClass'
import useNav from '@/shared/hooks/useNav'
import { ROL, validateRoutes } from '@/shared/roles'
import { ROUTES, firstRoutes, matchRoute } from '@/shared/routes'
import Logo from '@/shared/ui/Logo'
import { useUser } from '@clerk/nextjs'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import type { HtmlHTMLAttributes, JSX, ReactNode } from 'react'

import AuthButtons from '../AuthButton'
import './style.scss'

interface INav extends HtmlHTMLAttributes<HTMLElement> {
  children?: Readonly<ReactNode[]> | null
}

const Nav = ({ className, ...props }: INav): JSX.Element => {
  const { user } = useUser()
  const { getClass, pathname, show, toggleShow } = useNav()
  const isActive = (cls: string) => acl(matchRoute({ path: cls, route: pathname }))

  let userRol = user?.organizationMemberships[0]?.role
  if (!userRol && user) userRol = 'org:user'

  return (
    <section {...props} className={className}>
      <button className='navbar-hamburger' onClick={toggleShow}>
        {show ? <XIcon /> : <MenuIcon />}
      </button>
      <nav className={`navbar ${getClass()}`}>
        <div className='navbar-top'>
          <Link className={`navbar-link navbar-logo`} href={'/'}>
            <Logo />
          </Link>
          {firstRoutes.map(route => {
            const [tag, data] = route
            const { Icon, title, path, subPaths, requiredRoles } = data
            const haveRoles = validateRoutes(requiredRoles, userRol as ROL)
            if (!haveRoles) return
            return (
              <Link
                key={tag}
                className={`navbar-link ${isActive(path)} ${isActive(subPaths)}`}
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
