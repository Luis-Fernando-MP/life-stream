'use client'

import { LayoutDashboard, NetworkIcon } from 'lucide-react'
import type { JSX } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import './style.scss'

const HistoryButtons = (): JSX.Element => {
  const { setView, view } = useChartView()
  return (
    <section className={`history-buttons ${view}`}>
      <button className='history-button' onClick={() => setView('tails')}>
        <LayoutDashboard className='history-icon' />
        <div className='history-button__text'>
          <h5>Traditional con Arreglos</h5>
          <p>Utiliza un estructura tradicional basada en arreglos • Click para abrir</p>
        </div>
      </button>
      <button className='history-button' onClick={() => setView('tree')}>
        <NetworkIcon className='history-icon' />
        <div className='history-button__text'>
          <h5>Árboles Binarios Rojo-Negro</h5>
          <p>Optimizan el proceso de agregar nuevos donantes • Click para abrir</p>
        </div>
      </button>
    </section>
  )
}

export default HistoryButtons
