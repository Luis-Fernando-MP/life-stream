'use client'

import { type JSX, type ReactNode, useEffect, useState } from 'react'

interface IHydrate {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Hydrate = ({ children }: IHydrate): JSX.Element => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return <>{hydrated ? children : null}</>
}

export default Hydrate
