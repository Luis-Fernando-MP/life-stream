'use client'

/* eslint-disable @next/next/no-img-element */
import { ApiAllItemData } from '@/app/api/all/route'
import { fromDate } from '@/shared/time'
import type { JSX } from 'react'

import useSelectPerson, { ESelectPerson } from '../../../chart/hooks/useSelectPerson'
import './style.scss'

interface ITail {
  type: ESelectPerson
  image: string
  id: string
  name: string
  etc: ApiAllItemData
  createdAt: string
}

const Tail = ({ type, name, etc, id, image, createdAt }: ITail): JSX.Element => {
  const { setPerson } = useSelectPerson()

  const handleClick = (): void => {
    setPerson({
      type,
      ...etc
    })
  }

  return (
    <li className='comTails'>
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
