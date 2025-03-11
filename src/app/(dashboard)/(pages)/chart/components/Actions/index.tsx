'use client'

import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon } from 'lucide-react'
import { type JSX, memo } from 'react'

import useChartView from '../../hooks/useChartView'
import useSelectPerson from '../../hooks/useSelectPerson'
import './style.scss'

const Actions = (): JSX.Element => {
  const { person, setPerson } = useSelectPerson()
  const { view, setView } = useChartView()

  return (
    <section className='chart-actions chartActions animate-blurred-fade-in'>
      <h1>Visualizador de Miembros</h1>
      <h3>Estructura de Datos:</h3>

      <div className='chartActions-options'>
        <button onClick={() => setView('tree')} className={`chartActions-option ${acl(view === 'tree')}`}>
          <NetworkIcon />
          <p>Estructura Jerárquica</p>
        </button>
        <button onClick={() => setView('array')} className={`chartActions-option ${acl(view === 'array')}`}>
          <Rows4Icon />
          <p>Estructura de Lista</p>
        </button>
      </div>

      <div className='chartActions-selectNode'>
        <h3>{person?.id ? 'Detalles:' : 'Selecciona un nodo:'}</h3>
        {person?.id && (
          <button className='chartActions-selectNode__reset' onClick={() => setPerson(null)}>
            Restablecer
          </button>
        )}
        <p>{person?.id}</p>
      </div>

      <article className='chartRemember'>
        <div className='chartRemember-info'>
          <h3>Recuerda que puedes:</h3>
          <p>🖥️ Visualiza cada nodo</p>
          <p>✏️ Modifica información</p>
          <p>🔗 Consulta relaciones</p>
        </div>
        <video className='chartRemember-spirit' src='/spirit.mp4' muted autoPlay loop playsInline />
      </article>
    </section>
  )
}

export default memo(Actions)
