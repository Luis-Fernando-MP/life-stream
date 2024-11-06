import type { JSX } from 'react'

import DonorsComponent from './components/DonorsComponent'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='layout-page dataDon'>
      <article className='dataDon-container'>searchDonors</article>
      <DonorsComponent className='dataDon-container' />
    </section>
  )
}

export default Page
