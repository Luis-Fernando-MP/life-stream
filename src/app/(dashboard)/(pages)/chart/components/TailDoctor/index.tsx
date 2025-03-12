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

const TailDoctor = ({ type, name, etc, id, dbId, image, createdAt }: Props): JSX.Element => {
  const { setPerson } = useSelectPerson()

  const handleClick = (): void => {
    setPerson({ type, ...etc, dbId })
  }

  return (
    <li tabIndex={0} role='button' title={name} aria-label={name} className='tailDoctor' data-modal onClick={handleClick}>
      <button className='tailDoctor-button'>
        <Image className='tailDoctor-image' src={image} alt={name} layout='fullWidth' />
        <div className='tailDoctor-info'>
          <h5>{name}</h5>
          <p>{id}</p>
          <small>{fromDate(createdAt)}</small>
        </div>
      </button>
    </li>
  )
}

export default TailDoctor
