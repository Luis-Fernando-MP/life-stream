'use client'

import BoldText from '@/shared/ui/BoldText'
import type { JSX } from 'react'

import ValidateIDform from '../components/ValidateIDform'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='layout-page registerDonor'>
      <article className='registerDonor-container'>
        <BoldText bold='REGISTRO' middle='DE' desc='DONANTES DE SANGRE' />
        <ValidateIDform onSubmit={() => {}} />
      </article>
    </section>
  )
}

export default Page
