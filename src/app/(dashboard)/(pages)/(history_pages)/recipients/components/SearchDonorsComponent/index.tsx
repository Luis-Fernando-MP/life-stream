'use client'

import useSelectPerson from '@/app/(dashboard)/(pages)/chart/hooks/useSelectPerson'
import { getBloodType } from '@/shared/getBloodType'
import { fromDate } from '@/shared/time'
import { Image } from '@unpic/react'
import { DropletIcon } from 'lucide-react'
import { type JSX, memo } from 'react'

import useSearchDonors from '../../hooks/useSearchDonors'
import './style.scss'

const SearchDonorsComponent = (): JSX.Element => {
  const donorsSearch = useSearchDonors(s => s.donors)
  const setPerson = useSelectPerson(s => s.setPerson)

  const handleClick = (data: any): void => {
    setPerson({ ...data })
  }

  return (
    <section className='seDC-donors animate-blurred-fade-in'>
      {donorsSearch.map((donor: any, i: number) => {
        const doc = donor.CreatedBy

        const { person, DNI, age, weight, bloodType } = donor.patient
        const { photo } = person

        return (
          <button
            onClick={() => handleClick(donor)}
            key={donor.id + 'search'}
            className='seDC-item animate-fade-in-up'
            data-modal
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Image src={photo} alt={person.firstName} className='seDC-bgPatient' layout='constrained' width={70} height={70} />
            <div className='seDC-item__info'>
              <p>Paciente: {person.firstName}</p>
              <h4>DNI: {DNI}</h4>
              <p>
                {age} <b>años</b> · {weight} <b>Kg</b>
              </p>
              <div className='seDC-item__blood'>
                <DropletIcon />
                <p>{getBloodType(bloodType)?.abbreviation}</p>
              </div>
            </div>
            <div className='seDC-item__doctor'>
              <Image src={doc.photo} alt={doc.firstName} className='seDC-bgDoctor' layout='constrained' width={35} height={35} />
              <p>Atendido por:</p>
              <h5>{doc.firstName}</h5>
              <span>{fromDate(donor.lastDonation)}</span>
            </div>
          </button>
        )
      })}
    </section>
  )
}

export default memo(SearchDonorsComponent)
