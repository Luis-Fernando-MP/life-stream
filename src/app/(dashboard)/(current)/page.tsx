'use client'

import React, { useEffect, useState } from 'react'
import type { JSX } from 'react'

import ArrayView from './ArrayView'
import CodeView from './CodeView'
import { generateFakeData } from './data'
import { useDataStore } from './store'
import './style.scss'

const Page = (): JSX.Element => {
  const { data, setData } = useDataStore()
  const [view, setView] = useState<'array' | 'tree' | 'code'>('code')

  useEffect(() => {
    setData(generateFakeData())
  }, [setData])

  return (
    <section className='dHome'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Visualizando de Datos de Prisma</h1>
      <div className='mb-4 flex justify-center space-x-4'>
        <button onClick={() => setView('array')}>Ver como Arreglos</button>
        <button onClick={() => setView('tree')}>Ver como Árboles</button>
        <button onClick={() => setView('code')}>Ver como Código</button>
      </div>
      <CodeView />
      {/* {view === 'array' && <ArrayView />}
      {view === 'code' && <CodeView />} */}
    </section>
  )
}

export default Page
