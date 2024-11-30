'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon } from 'lucide-react'
import { type JSX } from 'react'

import StructureActions from './StructureActions'
import './style.scss'

const Actions = (): JSX.Element => {
  const { view, setView } = useChartView()

  return (
    <section className='practice-actions practiceActions animate-blurred-fade-in'>
      <h1>Practiquemos 🤓</h1>
      <h5>Escoge una estructura de Datos:</h5>
      <div className='practiceActions-options'>
        <button
          onClick={() => setView('tree')}
          className={`practiceActions-option ${acl(view === 'tree')}`}
        >
          <NetworkIcon />
          <p>Como Árbol</p>
        </button>
        <button
          onClick={() => setView('array')}
          className={`practiceActions-option ${acl(view === 'array')}`}
        >
          <Rows4Icon />
          <p>Como arrayList</p>
        </button>
      </div>

      <StructureActions view={view} />
    </section>
  )
}

export default Actions
