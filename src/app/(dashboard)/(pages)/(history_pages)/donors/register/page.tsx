'use client'

import type { JSX } from 'react'

import ValidateIDform from '../components/ValidateIDform'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='layout-page registerDonor'>
      <article className='registerDonor-container'>
        <div className='registerDonor-title'>
          <div>
            <h1>REGISTRO</h1>
            <h4>DE</h4>
          </div>
          <h4>DONANTES DE SANGRE</h4>
        </div>
        <ValidateIDform onSubmit={() => {}} />
      </article>
    </section>
  )
}

export default Page
