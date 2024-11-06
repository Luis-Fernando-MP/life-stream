'use client'

import { LayoutDashboard, NetworkIcon, Rows4Icon } from 'lucide-react'
import type { JSX } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import './style.scss'

const HistoryButtons = (): JSX.Element => {
  const { setView, view } = useChartView()
  return (
    <section className={`history-buttons cl-${view}`}>
      <button className='history-button' onClick={() => setView('tails')}>
        <div className='history-icon'>
          <Rows4Icon />
        </div>
        <div className='history-button__text'>
          <h5>Traditional con Colas</h5>
          <p>
            Empleemos un enfoque tradicional basada en simples colas • <u>Click para abrir</u>
          </p>
        </div>
      </button>
      <button className='history-button' onClick={() => setView('tree')}>
        <div className='history-icon'>
          <NetworkIcon />
        </div>
        <div className='history-button__text'>
          <h5>Árboles Binarios Rojo-Negro</h5>
          <p>
            Optimizan el proceso de la trata de información de donantes • <u>Click para abrir</u>
          </p>
        </div>
      </button>
    </section>
  )
}

export default HistoryButtons
