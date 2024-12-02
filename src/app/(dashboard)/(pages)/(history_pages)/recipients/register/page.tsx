'use client'

import { BloodReceiverWithRel } from '@/app/api/all/route'
import BoldText from '@/shared/ui/BoldText'
import { type JSX, useState } from 'react'

import FormRegisterReceptor from '../components/FormRegisterReceptor'
import ValidateIDform from '../components/ValidateIDform'
import './style.scss'

const Page = (): JSX.Element => {
  const [donor, setDonor] = useState<Partial<BloodReceiverWithRel> | null>(null)

  return (
    <section className='layout-page registerDonor'>
      <article className='registerDonor-container'>
        <BoldText bold='REGISTRO' middle='DE' desc='RECEPTORES DE SANGRE' />
        <ValidateIDform onSubmit={setDonor} />
        {donor && <FormRegisterReceptor patient={donor} setDonor={() => setDonor(null)} />}
      </article>
    </section>
  )
}

export default Page
