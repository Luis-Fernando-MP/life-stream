'use client'

import { acl } from '@/shared/activeClass'
import { NetworkIcon, Rows4Icon, SheetIcon } from 'lucide-react'
import { type JSX, memo } from 'react'

import useChartView from '../../hooks/useChartView'
import useSelectPerson from '../../hooks/useSelectPerson'
import './style.scss'

const Actions = (): JSX.Element => {
  const { person } = useSelectPerson()
  const { view, setView } = useChartView()

  return (
    <section className='chart-actions chartActions animate-blurred-fade-in'>
      <h1>Visualizador de Datos</h1>
      <h3>Tipo de estructura de Datos:</h3>
      <div className='chartActions-options'>
        <button
          onClick={() => setView('tree')}
          className={`chartActions-option ${acl(view === 'tree')}`}
        >
          <NetworkIcon />
          <p>Estructura de Árbol</p>
        </button>
        <button
          onClick={() => setView('array')}
          className={`chartActions-option ${acl(view === 'array')}`}
        >
          <Rows4Icon />
          <p>Estructura de arrayList</p>
        </button>
        <button
          onClick={() => setView('array')}
          className={`chartActions-option ${acl(view === 'array')}`}
        >
          <SheetIcon />
          <p>Relación de Tablas</p>
        </button>
      </div>
      <h3>Detalles de la selección:</h3>
      <div className='chartActions-selectNode'>
        <p>{person?.id}</p>
      </div>

      <article className='chartRemember'>
        <div className='chartRemember-info'>
          <h4>Recuerda que puedes:</h4>
          <p>
            🖥️ Visualiza cada nodo o ítem de la cola.
            <br />
            ✏️ Modifica información de los nodos.
            <br />
            🔗 Consulta relaciones entre tablas.
            <br />
            ⚙️ Ejecuta comandos básicos en la base de datos.
          </p>
        </div>
        <video className='chartRemember-spirit' src='/spirit.mp4' muted autoPlay loop />
      </article>
    </section>
  )
}

export default memo(Actions)
