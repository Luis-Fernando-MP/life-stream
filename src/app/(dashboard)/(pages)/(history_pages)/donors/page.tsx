import type { JSX } from 'react'

import DonorsComponent from './components/DonorsComponent'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='layout-page dataDon'>
      <article className='dataDon-search dataDon-container'>searchDonors</article>
      <DonorsComponent className='dataDon-donors dataDon-container' />
    </section>
  )
}

export default Page
