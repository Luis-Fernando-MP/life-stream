'use client'

import { acl } from '@/shared/activeClass'
import { type JSX } from 'react'

import './style.scss'

interface IRangeOrIndividualView {
  setRange: (range: [any, any]) => void
  ranges: any[]
  inRange?: boolean
  label: string
  error?: string
  value: any
}

const FormRangeView = ({
  setRange,
  ranges,
  label,
  error,
  value,
  inRange = true
}: IRangeOrIndividualView): JSX.Element => {
  return (
    <section className={`rangeOrIndividualView ${acl(!!error, 'box-error')}`}>
      <h5 className='block font-medium'>{label}</h5>
      {error && <p className='rangeOrIndividualView-error'>{error}</p>}

      <section className='rangeOrIndividualView-range'>
        {ranges.map(r => {
          const isActive = inRange
            ? value.some((range: any) => range >= r[0] && range <= r[1])
            : value === r
          return (
            <button
              key={inRange ? r.join(' - ') : r}
              className={acl(isActive)}
              type='button'
              onClick={() => setRange(r)}
            >
              {inRange ? r.join(' - ') : r}
            </button>
          )
        })}
      </section>
    </section>
  )
}

export default FormRangeView
