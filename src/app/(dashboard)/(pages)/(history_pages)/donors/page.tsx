import type { JSX } from 'react'

import DonorsComponent from './components/DonorsComponent'
import SearchDonors from './components/searchDonors'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='layout-page dataDon'>
      <SearchDonors className='dataDon-container' />
      <DonorsComponent className='dataDon-container' />
    </section>
  )
}

export default Page
