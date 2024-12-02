'use client'

import { NetworkIcon, Rows4Icon } from 'lucide-react'
import type { JSX } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import './style.scss'

const HistoryButtons = (): JSX.Element => {
  const { setView, view } = useChartView()

  return (
    <section className={`history-buttons cl-${view}`}>
      <button className='history-button' onClick={() => setView('array')}>
        <Rows4Icon />
      </button>
      <button className='history-button' onClick={() => setView('tree')}>
        <NetworkIcon />
      </button>
    </section>
  )
}

export default HistoryButtons
