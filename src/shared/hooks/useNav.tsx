'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const useNav = () => {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth < 1200)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleShow = (): void => {
    setShow(!show)
  }

  const getClass = () => {
    return show ? 'show-menu' : ''
  }

  return { show, toggleShow, pathname, getClass }
}

export default useNav
