'use client'

import { PersonWithBloodDonor } from '@/app/api/donations/route'
import { useBloodDonations } from '@/db/hooks/useBloodDonations'
import { RobotoFont } from '@/shared/fonts'
import { fromDate, toDay } from '@/shared/time'
import BoldText from '@/shared/ui/BoldText'
import Logo from '@/shared/ui/Logo'
import dayjs from 'dayjs'
import { Calendar, Clock2, MapPinPlusInsideIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

import './style.scss'

/* eslint-disable @next/next/no-img-element */

const Details = (): JSX.Element => {
  const { data, status } = useBloodDonations()
  console.log(data)

  if (status === 'pending') return <h2>Cargando...</h2>
  if (status === 'error' || !data) return <h2>Algo a salido mal...</h2>

  const { bloodDonor } = data as PersonWithBloodDonor

  const lastDonation = bloodDonor[0].BloodDonation[0]

  return (
    <section className='layout-page WDDetails animate-fade-in-up'>
      <BoldText bold='VEAMOS' middle='QUE' desc='HAY POR ACA' />
      <section className='WDDetails-container'>
        <article className='WDDetails-info'>
          <div className='WDDetails-card'>
            <header className='WDDetails-card__header'>
              <Logo />
            </header>
            <section className='WDDetails-card__body'>
              <h2 className={`days ${RobotoFont.className}`}>{fromDate(lastDonation.donationDate.toString())}</h2>
              <h2 className='sub'>VOLUNTARIA DE SANGRE</h2>
              <div>
                <Calendar />
                <p>{toDay(lastDonation.donationDate.toString())}</p>
              </div>
              <div>
                <Clock2 />
                <p>De 9 a.m. a 4 p.m. </p>
              </div>
              <div>
                <MapPinPlusInsideIcon />
                <p>Servicio de Hemoterapia</p>
              </div>
            </section>
            <footer className='WDDetails-card__footer'>
              <h3>Campus los olivos</h3>
              <p>📢 Recuerda ser puntual</p>
              <span>Con tu ayuda una vida se salvara</span>
            </footer>
            <div className='WDDetails-card__image'>
              <img src='/blood-donation.webp' alt='blood-donation' />
            </div>
          </div>
        </article>
        <article className='WDDetails-donations'>
          <h3>Mis citas 🏁</h3>
          <Link href='/want-donate' className='WDDetails-link'>
            Registrar nueva fecha
          </Link>
          <table className='WDDetails-donations__table'>
            <thead>
              <tr>
                <th>🆔 ID</th>
                <th>✅ Completado</th>
                <th>📅 Fecha</th>
                <th>🩺 Doctor</th>
              </tr>
            </thead>
            <tbody>
              {bloodDonor[0].BloodDonation.map(dn => (
                <tr key={dn.id}>
                  <td>
                    <p>{dn.id}</p>
                  </td>
                  <td>
                    <h5 className={`fulfilled ${dn.fulfilled}`}>{dn.fulfilled}</h5>
                  </td>
                  <td>
                    <p>{dayjs(dn.donationDate).format('DD/MM/YYYY')}</p>
                  </td>
                  <td>
                    <h5>{dn.DoctorID ?? 'Pendiente'}</h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </section>
  )
}

export default Details
