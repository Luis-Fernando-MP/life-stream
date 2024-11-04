'use client'

import type { JSX } from 'react'

import ValidateIDform from '../components/ValidateIDform'
import './style.scss'

const Page = (): JSX.Element => {
  console.log('render')

  return (
    <section className='layout-page dHome'>
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
