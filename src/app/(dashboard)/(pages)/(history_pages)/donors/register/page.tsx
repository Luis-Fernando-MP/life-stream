'use client'

import { BloodReceiverWithRel } from '@/app/api/allData/route'
import BoldText from '@/shared/ui/BoldText'
import { type JSX, useState } from 'react'

import FormRegisterDonor from '../components/FormRegisterDonor'
import ValidateIDform from '../components/ValidateIDform'
import './style.scss'

const Page = (): JSX.Element => {
  const [donor, setDonor] = useState<Partial<BloodReceiverWithRel> | null>(null)

  return (
    <section className='layout-page registerDonor'>
      <article className='registerDonor-container'>
        <BoldText bold='REGISTRO' middle='DE' desc='DONANTES DE SANGRE' />
        <p className='registerDonor-title'>
          Busca un paciente ya registrado por su DNI, si no existe, puedes crear uno nuevo de forma inmediata
        </p>
        <ValidateIDform onSubmit={setDonor} />
        {donor && <FormRegisterDonor patient={donor} setDonor={() => setDonor(null)} />}
      </article>
    </section>
  )
}

export default Page
