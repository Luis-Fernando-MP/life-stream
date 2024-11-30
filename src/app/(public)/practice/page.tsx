'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import { type JSX } from 'react'

import Actions from './components/Actions'
import PracticeTails from './components/PracticeTails'
import PracticeTreeGraph from './components/PracticeTreeGraph'
import './style.scss'

const Page = (): JSX.Element => {
  const view = useChartView(s => s.view)

  return (
    <article className='layout-container practice'>
      <section className='practice-draft'>
        {view === 'tree' && <PracticeTreeGraph />}
        {view === 'array' && <PracticeTails />}
      </section>
      <Actions />
    </article>
  )
}

export default Page
