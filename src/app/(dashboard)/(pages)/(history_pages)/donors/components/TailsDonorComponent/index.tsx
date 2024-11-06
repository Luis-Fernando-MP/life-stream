/* eslint-disable @next/next/no-img-element */
import { BloodDonorWithRel } from '@/app/api/all/route'
import { getBloodType } from '@/shared/getBloodType'
import dayjs from 'dayjs'
import { DropletIcon } from 'lucide-react'
import type { JSX } from 'react'

import './style.scss'

interface ITailsDonorComponent {
  donors: BloodDonorWithRel[]
}

const TailsDonorComponent = ({ donors }: ITailsDonorComponent): JSX.Element => {
  return (
    <ul className='compTailsDonors-list'>
      {donors.map((donor, i) => {
        const { lastDonation } = donor
        const { age, weight, bloodType } = donor.patient
        const { photo, firstName, lastName } = donor.patient.person
        return (
          <li
            key={donor.id}
            className='compTailsDonors-item animate-fade-in-up'
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <button>
              <img src={photo ?? '/user-default-bg.webp'} alt={firstName} loading='lazy' />
              <h4 className='compTailsDonors-item__name'>
                {firstName} {lastName}
              </h4>
              <h4 className='compTailsDonors-item__info'>
                {age} <b>años</b> · {weight} <b>Kg</b>
              </h4>
              <div className='compTailsDonors-item__blood'>
                <DropletIcon />
                <p>{getBloodType(bloodType).abbreviation}</p>
              </div>
              <div className='compTailsDonors-item__lastDonation'>
                <p>Ultima Donación</p>
                <h4>• {dayjs(lastDonation).format('DD / MM / YYYY')}</h4>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default TailsDonorComponent
