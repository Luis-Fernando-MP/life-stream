'use client'

/* eslint-disable @next/next/no-img-element */
import { fromDate } from '@/shared/time'
import type { JSX } from 'react'

import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import './style.scss'

interface ITail {
  type: ESelectPerson
  image: string
  id: string
  dbId: string
  name: string
  etc: any
  createdAt: string
}

const Tail = ({ type, name, etc, id, dbId, image, createdAt }: ITail): JSX.Element => {
  const { setPerson } = useSelectPerson()

  const handleClick = (): void => {
    setPerson({ type, ...etc, dbId })
  }

  return (
    <li className='comTails' data-modal>
      <button onClick={handleClick}>
        <img src={image} alt={name} />
        <h5>{name}</h5>
        <p>{id}</p>
        <small>{fromDate(createdAt)}</small>
      </button>
    </li>
  )
}

export default Tail
