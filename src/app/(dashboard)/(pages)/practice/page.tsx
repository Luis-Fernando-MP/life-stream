'use client'

import { type JSX } from 'react'

import useChartView from '../chart/hooks/useChartView'
import Actions from './components/Actions'
import PracticeTreeGraph from './components/PracticeTreeGraph'
import Tails from './components/Tails'
import './style.scss'

const Page = (): JSX.Element => {
  const view = useChartView(s => s.view)

  return (
    <article className='layout-container practice'>
      <section className='practice-draft'>
        {view === 'tree' && <PracticeTreeGraph />}
        {view === 'tails' && <Tails />}
      </section>
      <Actions />
    </article>
  )
}

export default Page
