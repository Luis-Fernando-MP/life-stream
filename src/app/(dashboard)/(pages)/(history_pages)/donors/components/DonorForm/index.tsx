'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import {
  IDonorsSearchRes,
  ageRanges,
  donorsSearchResolver,
  lastDonationDateMap,
  weightRanges
} from '@/resolvers/donorResolver'
import { acl } from '@/shared/activeClass'
import { bloodTypeArr } from '@/shared/getBloodType'
import { fromDate } from '@/shared/time'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import useSearchDonors from '../../hooks/useSearchDonors'
import './style.scss'

function DonorForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IDonorsSearchRes>({
    mode: 'onChange',
    resolver: donorsSearchResolver,
    defaultValues: {
      ageRange: [18, 25],
      weightRange: [50, 70],
      bloodType: 'A+',
      lastDonationDate: lastDonationDateMap[0]
    }
  })
  const trees = useStoreTrees(s => s.data.trees)
  const setDonors = useSearchDonors(s => s.setDonors)
  const setView = useChartView(s => s.setView)

  const { ageRange, weightRange, bloodType, dni, firstName, lastDonationDate, lastName } = errors

  useEffect(() => {
    return () => setView('tree')
  }, [setView])

  const onSubmit = (formData: IDonorsSearchRes) => {
    const donorsTree = trees.pacientes

    const results = donorsTree.findMany(data => {
      return data.person.firstName.includes(formData.firstName)
    })

    setDonors(results.nodes.map(n => n.data))
    setView('search')

    console.log(results.nodes.map(n => n.data))

    // console.log(data)
    // console.log('FIND ID ', data.trees.dopnpmnantes.find(Number(dni)))

    // {
    //   "bloodType": "B-",
    //   "ageRange": [
    //     26,
    //     35
    //   ],
    //   "weightRange": [
    //     91,
    //     110
    //   ],
    //   "firstName": "Luis",
    //   "lastName": "Cardenas",
    //   "dni": "90",
    //   "lastDonationDate": "2024-11-02T00:20:11.014Z"
    // }
  }

  const selectedAge = watch('ageRange')
  const selectedBloodType = watch('bloodType')
  const selectedWeight = watch('weightRange')
  const selectedDate = watch('lastDonationDate')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='searchDonorsForm'>
      <button className='searchDonorsForm-submit' type='submit'>
        APLICAR TODO
      </button>

      <section className={`searchDonorsForm-container ${acl(!!ageRange, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por rango de <b>Edad</b>
        </h5>
        {ageRange && <p className='searchDonorsForm-error'>{ageRange.message}</p>}
        <section className='searchDonorsForm-range'>
          {ageRanges.map(r => {
            const isActive = selectedAge.some((range: any) => range >= r[0] && range <= r[1])
            return (
              <button
                key={r.toString()}
                className={acl(isActive)}
                type='button'
                onClick={() => setValue('ageRange', r)}
              >
                {r.join(' - ')}
              </button>
            )
          })}
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!bloodType, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por tipo de <b>Sangre</b>
        </h5>
        {bloodType && <p className='searchDonorsForm-error'>{String(bloodType.message)}</p>}
        <section className='searchDonorsForm-range'>
          {bloodTypeArr.map(bl => {
            const isActive = selectedBloodType === bl
            return (
              <button
                key={bl + '-search'}
                className={acl(isActive)}
                type='button'
                onClick={() => setValue('bloodType', bl)}
              >
                {bl}
              </button>
            )
          })}
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!weightRange, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por rango de <b>Peso</b>
        </h5>
        {weightRange && <p className='searchDonorsForm-error'>{weightRange.message}</p>}
        <section className='searchDonorsForm-range'>
          {weightRanges.map(we => {
            const isActive = selectedWeight.some((range: any) => range >= we[0] && range <= we[1])
            return (
              <button
                key={we.toString()}
                className={acl(isActive)}
                type='button'
                onClick={() => setValue('weightRange', we)}
              >
                {we.join(' - ')}
              </button>
            )
          })}
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!firstName, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por <b>Nombres</b> del Donante
        </h5>
        {firstName && <p className='searchDonorsForm-error'>{firstName.message}</p>}
        <section className='searchDonorsForm-range'>
          <input type='text' autoComplete='off' {...register('firstName')} />
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!lastName, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por <b>Apellidos</b> del Donante
        </h5>
        {lastName && <p className='searchDonorsForm-error'>{lastName.message}</p>}
        <section className='searchDonorsForm-range'>
          <input type='text' autoComplete='off' {...register('lastName')} />
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!dni, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por <b>DNI</b> del Donante
        </h5>
        {dni && <p className='searchDonorsForm-error'>{dni.message}</p>}
        <section className='searchDonorsForm-range'>
          <input type='text' autoComplete='off' {...register('dni')} />
        </section>
      </section>

      <section className={`searchDonorsForm-container ${acl(!!lastDonationDate, 'box-error')}`}>
        <h5 className='block font-medium'>
          Por última <b>Fecha</b> de Donación
        </h5>
        {lastDonationDate && <p className='searchDonorsForm-error'>{lastDonationDate.message}</p>}
        <section className='searchDonorsForm-range'>
          {lastDonationDateMap.map(dt => {
            const now = fromDate(dt.toString())
            const isActive = dayjs(selectedDate).isSame(dt, 'day')
            return (
              <button
                key={now + '-search'}
                className={acl(isActive)}
                type='button'
                onClick={() => setValue('lastDonationDate', dt)}
              >
                {now}
              </button>
            )
          })}
        </section>
      </section>
    </form>
  )
}

export default DonorForm
