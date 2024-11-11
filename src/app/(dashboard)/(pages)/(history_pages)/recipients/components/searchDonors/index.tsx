import BoldText from '@/shared/ui/BoldText'
import type { JSX } from 'react'

import DonorForm from '../DonorForm'
import './style.scss'

interface ISearchDonors {
  className?: string
}

const SearchDonors = ({ className }: ISearchDonors): JSX.Element => {
  return (
    <section className={`${className} searchDonors`}>
      <BoldText bold='BÚSQUEDA' middle='DE' desc='RECEPTORES DE SANGRE' />
      <DonorForm />
    </section>
  )
}

export default SearchDonors
