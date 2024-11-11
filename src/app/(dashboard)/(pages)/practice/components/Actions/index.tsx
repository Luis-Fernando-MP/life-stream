'use client'

import { acl } from '@/shared/activeClass'
import { Eraser, FilePenLine, NetworkIcon, Rows4Icon, TreePine } from 'lucide-react'
import { type JSX, memo } from 'react'

import useChartView from '../../../chart/hooks/useChartView'
import useSelectPerson from '../../../chart/hooks/useSelectPerson'
import usePracticeView from '../../hooks/usePracticeView'
import AddDataPractice from '../AddDataPractice'
import './style.scss'

const Actions = (): JSX.Element => {
  const { person } = useSelectPerson()
  const { view, setView } = useChartView()
  const practiceView = usePracticeView()

  const paragraphFromView = view === 'tree' ? 'Árbol' : 'Tabla'
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
      <h4>ACCIONES:</h4>
      <div className='practiceActions-handles'>
        <button
          onClick={() => practiceView.setView('add')}
          className={`practiceActions-handle ${acl(practiceView.view === 'add')}`}
        >
          <TreePine />
          <p>Agregar {paragraphFromView}</p>
        </button>
        <button
          onClick={() => practiceView.setView('remove')}
          className={`practiceActions-handle ${acl(practiceView.view === 'remove')}`}
        >
          <Eraser />
          <p>Remover {paragraphFromView}</p>
        </button>
        <button
          onClick={() => practiceView.setView('update')}
          className={`practiceActions-handle ${acl(practiceView.view === 'update')}`}
        >
          <FilePenLine />
          <p>Editar {paragraphFromView}</p>
        </button>
      </div>

      <section className='practiceActions-view'>
        {practiceView.view === 'add' && (
          <AddDataPractice className='practiceActions-view__container animate-blurred-fade-in' />
        )}
      </section>

      <div className='practiceActions-selectNode'>
        <p>{person?.id}</p>
      </div>
    </section>
  )
}

export default memo(Actions)
