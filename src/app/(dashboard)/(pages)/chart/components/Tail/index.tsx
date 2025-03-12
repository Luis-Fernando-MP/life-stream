'use client'

import { fromDate } from '@/shared/time'
import { Image } from '@unpic/react'
import type { JSX } from 'react'

import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import './style.scss'

interface Props {
  type: ESelectPerson
  image: string
  id: string
  dbId: string
  name: string
  etc: any
  createdAt: string
}

const Tail = ({ type, name, etc, id, dbId, image, createdAt }: Props): JSX.Element => {
  const { setPerson } = useSelectPerson()

  const handleClick = (): void => {
    setPerson({ type, ...etc, dbId })
  }

  return (
    <li tabIndex={0} role='button' title={name} aria-label={name} className='defaultTail' data-modal onClick={handleClick}>
      <button className='defaultTail-button'>
        <Image className='defaultTail-image' src={image} alt={name} layout='constrained' width={40} height={40} />
        <div className='defaultTail-info'>
          <h5>{name}</h5>
          <p>{id}</p>
          <small>{fromDate(createdAt)}</small>
        </div>
      </button>
    </li>
  )
}

export default Tail
