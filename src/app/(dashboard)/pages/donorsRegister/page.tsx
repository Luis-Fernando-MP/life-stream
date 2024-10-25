'use client'

import { UserRoundSearchIcon } from 'lucide-react'
import type { JSX } from 'react'

import useMode from '../hooks/useMode'
import ValidateIDform from './components/ValidateIDform'
import './style-home.scss'

const Page = (): JSX.Element => {
  console.log('render')
  const mode = useMode(s => s.mode)

  return (
    <section className='dHome'>
      <article className='dHome-container'>
        <div className='dHome-title'>
          <h1>REGISTRO</h1>
          <h4>DE</h4>
          <h4>DONANTES DE SANGRE</h4>
        </div>
        <ValidateIDform onSubmit={() => {}} />
      </article>
    </section>
  )
}

export default Page
