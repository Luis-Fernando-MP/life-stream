'use client'

import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon } from 'lucide-react'
import type { JSX } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import './style.scss'

const HistoryButtons = (): JSX.Element => {
  const { setView, view } = useChartView()

  return (
    <section className='history-buttons'>
      <p className='history-buttons-label'>Vista:</p>
      <button
        className={`history-button ${acl(view === 'array')}`}
        onClick={() => setView('array')}
        title='Vista de lista'
        aria-label='Vista de lista'
      >
        <Rows4Icon />
      </button>
      <button
        className={`history-button ${acl(view === 'tree')}`}
        onClick={() => setView('tree')}
        title='Vista de árbol'
        aria-label='Vista de árbol'
      >
        <NetworkIcon />
      </button>
    </section>
  )
}

export default HistoryButtons
