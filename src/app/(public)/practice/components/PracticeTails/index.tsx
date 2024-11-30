import type { JSX } from 'react'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const PracticeTails = (): JSX.Element => {
  const { tails } = usePracticeStoreTrees()
  console.log('tails', tails)

  return (
    <section className='tails delay animate-blurred-fade-in'>
      <h2>Vista Por arrayList</h2>

      <article className='tails-box'>
        <ul className='tails-box__list'>
          {Object.entries(tails).map(([k]) => {
            // console.log('tail: ', k, v)
            const key = `tail-box-${k}`
            return <p key={key}>{k}</p>
          })}
        </ul>
      </article>
    </section>
  )
}

export default PracticeTails
