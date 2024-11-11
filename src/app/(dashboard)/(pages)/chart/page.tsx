'use client'

import { type JSX } from 'react'

import Actions from './components/Actions'
import Tails from './components/Tails'
import TreeGraph from './components/TreeGraph'
import useChartView from './hooks/useChartView'
import './style.scss'

const Page = (): JSX.Element => {
  const view = useChartView(s => s.view)

  return (
    <article className='layout-container chart'>
      <section className='chart-draft'>
        {view === 'tree' && <TreeGraph />}
        {view === 'tails' && <Tails />}
      </section>
      <Actions />
    </article>
  )
}

export default Page
