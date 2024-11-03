import type { JSX } from 'react'

import './style.scss'

const Firefly = (): JSX.Element => {
  return (
    <section className='firefly'>
      {Array(50)
        .fill(0)
        .map((_, i) => {
          return <div key={`firefly-${i}`} className='firefly-item'></div>
        })}
    </section>
  )
}

export default Firefly
