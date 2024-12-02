'use client'

import useChartView from '@pages/chart/hooks/useChartView'
import { JSX, memo } from 'react'

import AddNewPracticeNode from './AddNewPracticeNode'
import './style.scss'

const AddDataPractice = (): JSX.Element => {
  const view = useChartView(s => s.view)
  const paragraphView = view === 'tree' ? 'Árbol' : 'Lista'

  return (
    <article className='practiceActions-view__container addDataPractice animate-blurred-fade-in'>
      <h4>Datos de la estructura</h4>
      <p>Escoge un {paragraphView}:</p>
      <AddNewPracticeNode />
    </article>
  )
}

export default memo(AddDataPractice)
