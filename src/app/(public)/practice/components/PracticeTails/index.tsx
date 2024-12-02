import type { JSX } from 'react'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const PracticeTails = (): JSX.Element => {
  const { tails } = usePracticeStoreTrees()

  return (
    <section className='tails delay animate-blurred-fade-in'>
      <h2>Vista Por arrayList</h2>

      <article className='tails-box'>
        {Object.entries(tails).map(([k, v]) => {
          const key = `tail-box-${k}`

          return (
            <section key={key} className='tails-box__container'>
              <h3>{k}</h3>
              <div className='tails-box__list'>
                {v.map(({ id }) => {
                  return (
                    <button className='tails-box__item' key={key + id}>
                      <p>🪢</p>
                      <h3>{id}</h3>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </article>
    </section>
  )
}

export default PracticeTails
