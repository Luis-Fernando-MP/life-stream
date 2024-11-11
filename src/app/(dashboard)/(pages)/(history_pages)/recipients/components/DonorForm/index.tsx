'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import { useSetHistories } from '@/db/hooks/useHistory'
import {
  IDonorsSearchRes,
  ageRanges,
  donorsSearchResolver,
  lastDonationDateMap,
  weightRanges
} from '@/resolvers/donorResolver'
import { acl } from '@/shared/activeClass'
import { bloodTypeArr, getBloodType } from '@/shared/getBloodType'
import { fromDate } from '@/shared/time'
import dayjs from 'dayjs'
import React, { memo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

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
      ageRange: [0, Number.MAX_SAFE_INTEGER],
      weightRange: [0, Number.MAX_SAFE_INTEGER],
      bloodType: 'ALL',
      lastDonationDate: lastDonationDateMap[0]
    }
  })
  const { mutate } = useSetHistories()
  const trees = useStoreTrees(s => s.data.trees)
  const setDonors = useSearchDonors(s => s.setDonors)
  const setView = useChartView(s => s.setView)

  const { ageRange, weightRange, bloodType, dni, firstName, lastDonationDate, lastName } = errors

  useEffect(() => {
    return () => setView('tree')
  }, [setView])

  const onSubmit = useCallback(
    (f: IDonorsSearchRes) => {
      const toastId = toast.success('Filtro aplicados')
      const donorsTree = trees.donantes
      const results = donorsTree.findMany(data => {
        const { DNI, bloodType, age, person, weight } = data.patient
        const isValidDni = String(DNI).startsWith(String(f.dni))
        if (!isValidDni) return false
        const equalBloodType =
          getBloodType(bloodType)?.abbreviation === f.bloodType || f.bloodType === 'ALL'
        if (!equalBloodType) return false
        const inAgeRange = age >= f.ageRange[0] && age <= f.ageRange[1]
        const inWeightRange = weight >= f.weightRange[0] && weight <= f.weightRange[1]
        if (!inAgeRange || !inWeightRange) return false
        const includeFirstName = person.firstName.toLowerCase().includes(f.firstName.toLowerCase())
        const includeLastName = person.lastName.toLowerCase().includes(f.lastName.toLowerCase())
        if (!includeFirstName || !includeLastName) return false
        return true
      })
      if (results.nodes.length < 1) toast.error('Sin resultados', { id: toastId })
      setDonors(results.nodes.map(n => n.data))
      setView('search')
      console.log(results.nodes)

      const bodyData = `<section class='history-search'>
        <h5>Filtraste a ${results.nodes.length} donante(s)</h5>
        <div class='history-search__users'>
        ${results.nodes
          .map(d => {
            return `<div style="background-color: ${d.color === 'black' ? '#ccc' : 'red'};">
            <img src='${d?.data?.patient.person.photo}' alt='donor filter' />
          </div>`
          })
          .join(' ')}
        </div>
      </section>`
      console.log(bodyData)

      mutate({ body: bodyData })
    },
    [mutate, setDonors, setView, trees.donantes]
  )

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
          <button
            className={acl(selectedAge[0] <= 0)}
            type='button'
            onClick={() => setValue('ageRange', [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])}
          >
            ALL
          </button>
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
          <button
            className={acl(selectedBloodType === 'ALL')}
            type='button'
            onClick={() => setValue('bloodType', 'ALL')}
          >
            ALL
          </button>
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
          <button
            className={acl(selectedWeight[0] <= 0)}
            type='button'
            onClick={() =>
              setValue('weightRange', [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
            }
          >
            ALL
          </button>
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

export default memo(DonorForm)
