'use client'

import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon } from 'lucide-react'
import { type JSX } from 'react'

import Tails from './components/Tails'
import TreeGraph from './components/TreeGraph'
import useChartView from './hooks/useChartView'
import './style.scss'

const Page = (): JSX.Element => {
  const { view, setView } = useChartView()

  return (
    <article className='layout-container chart'>
      <section className='chart-draft'>
        {view === 'tree' && <TreeGraph />}
        {view === 'array' && <Tails />}
      </section>

      <section className='chartActions-header'>
        <h1>Visualizador de Miembros</h1>
        <h3>Estructura de Datos:</h3>

        <section className='chartActions-options'>
          <button onClick={() => setView('tree')} className={`chartActions-option ${acl(view === 'tree')}`}>
            <NetworkIcon />
            <p>Estructura Jerárquica</p>
          </button>
          <button onClick={() => setView('array')} className={`chartActions-option ${acl(view === 'array')}`}>
            <Rows4Icon />
            <p>Estructura de Lista</p>
          </button>
        </section>
      </section>

      <article className='chartRemember'>
        <div className='chartRemember-info'>
          <h3>Recuerda que puedes:</h3>
          <p>🖥️ Visualiza cada nodo</p>
          <p>✏️ Modifica información</p>
          <p>🔗 Consulta relaciones</p>
        </div>
        <video className='chartRemember-spirit' src='/spirit.mp4' muted autoPlay loop playsInline />
      </article>
    </article>
  )
}

export default Page
