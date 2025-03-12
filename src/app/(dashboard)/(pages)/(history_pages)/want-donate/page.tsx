'use server'

import BoldText from '@/shared/ui/BoldText'
import type { JSX } from 'react'

import FormRegisterHero from './components/FormRegisterHero'
import './style.scss'

const WantDonate = (): JSX.Element => {
  return (
    <section className='layout-page WantDonate animate-fade-in-up'>
      <BoldText bold='QUIERO' middle='SER' desc='UN HEROE DE LA VIDA' />
      <FormRegisterHero />
    </section>
  )
}

export default WantDonate
