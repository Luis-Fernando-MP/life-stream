'use client'

import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon, SheetIcon } from 'lucide-react'
import { type JSX, memo } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import useSelectPerson from '../../../chart/hooks/useSelectPerson'
import './style.scss'

const Actions = (): JSX.Element => {
  const { person } = useSelectPerson()
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
          onClick={() => setView('tails')}
          className={`practiceActions-option ${acl(view === 'tails')}`}
        >
          <Rows4Icon />
          <p>Como arrayList</p>
        </button>
      </div>
      <h3>Detalles de la selección:</h3>
      <div className='practiceActions-selectNode'>
        <p>{person?.id}</p>
      </div>
    </section>
  )
}

export default memo(Actions)
