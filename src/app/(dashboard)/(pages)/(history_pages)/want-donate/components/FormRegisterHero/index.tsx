'use client'

import { useHeroDonations, useSetHero } from '@/db/hooks/useSetHero'
import { IHeroRegisterRes, heroRegisterResolver } from '@/resolvers/heroRegisterResolver'
import { acl } from '@/shared/activeClass'
import { bloodTypeAbb, bloodTypeArr } from '@/shared/getBloodType'
import { useUser } from '@clerk/nextjs'
import { BloodType } from '@prisma/client'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IFormRegisterHero {
  className?: string
}

const FormRegisterHero = ({ className }: IFormRegisterHero): JSX.Element => {
  const toastHeroId = 'id-donors-modal'
  const { mutate: heroMutate, isPending: isHeroMutating } = useSetHero(toastHeroId)
  const { push } = useRouter()
  const { user } = useUser()
  const { data: heroDonations, isLoading } = useHeroDonations(user?.id)
  const hookForm = useForm<IHeroRegisterRes>({
    resolver: heroRegisterResolver,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const heroLastDonation = heroDonations?.donations[heroDonations.donations.length - 1]?.donationDate

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = hookForm

  const { age, bloodType, dni, firstName, donationDate, lastName, weight, lastDonationDate } = errors

  useEffect(() => {
    if (!heroDonations) return
    const { person, patient } = heroDonations
    if (!person || !patient) return

    const lastDonation = heroDonations.donations.length > 0 ? dayjs(heroLastDonation).format('YYYY-MM-DD') : ''

    const formData = {
      firstName: person.firstName,
      lastName: person.lastName,
      age: patient.age,
      bloodType: bloodTypeAbb[patient.bloodType as BloodType],
      weight: patient.weight,
      dni: patient.DNI,
      lastDonationDate: lastDonation
    }
    hookForm.reset(formData)
  }, [heroDonations, hookForm])

  const onFormSubmit = async ({ donationDate, lastDonationDate, ...data }: IHeroRegisterRes) => {
    toast.loading('Te estamos registrando 🚀', { id: toastHeroId })

    const donDate = dayjs(donationDate)
    const lastDonDate = lastDonationDate ? dayjs(lastDonationDate) : donDate

    const parsedLastDonation = heroLastDonation ? dayjs(heroLastDonation) : donDate

    if (heroLastDonation) {
      if (donDate.isBefore(lastDonDate)) {
        toast.error('Tu fecha de donación no puede ser anterior a la fecha de tu última donación.', { id: toastHeroId })
        return
      }
      if (lastDonDate.isAfter(donDate)) {
        toast.error('La última fecha de donación no puede ser superior a la fecha de donación seleccionada.', {
          id: toastHeroId
        })
        return
      }
      if (donDate.isBefore(parsedLastDonation.add(2, 'month'))) {
        toast.error('La fecha de donación debe ser al menos 2 meses después de la última donación registrada.', {
          id: toastHeroId
        })
        return
      }
      if (parsedLastDonation && !parsedLastDonation.isSame(lastDonDate)) {
        toast.error(
          'Tu ultima fecha de donación no coincide con la fecha que registrada en el sistema. Esto podría generar resultados incorrectos en tus próximas donaciones.',
          { id: toastHeroId }
        )
        return
      }
    }

    const heroData = {
      ...data,
      donationDate: donDate.toDate(),
      lastDonationDate: lastDonDate.toDate()
    }

    heroMutate(
      { body: heroData },
      {
        onSuccess() {
          push('/want-donate/details')
        }
      }
    )
  }

  const onErrors = () => {
    toast.error('Completa los campos requeridos')
  }

  return (
    <form
      className={`${className ?? ''} ${acl(isLoading || isHeroMutating, 'loading')} RDForm animate-fade-in-up`}
      onSubmit={handleSubmit(onFormSubmit, onErrors)}
    >
      <Link href='/want-donate/details' className='RDForm-link'>
        Quiero ver mis fechas de donación
      </Link>
      <button className='RDForm-submit' type='submit' disabled={isHeroMutating}>
        {isHeroMutating ? 'Enviando...' : 'DONAR AHORA'}
      </button>

      <section className={`RDForm-section ${acl(!!donationDate, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Fecha</b> de <b>donación</b>
          </h5>
          <input
            {...register('donationDate')}
            min={heroLastDonation ? dayjs(heroLastDonation).add(2, 'month').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
            defaultValue={
              heroLastDonation ? dayjs(heroLastDonation).add(2, 'month').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
            }
            type='date'
          />
        </div>

        {donationDate && <p className='error-message'>{donationDate.message as any}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!lastDonationDate, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Última Fecha</b> de <b>donación</b>
          </h5>
          <input disabled={!heroLastDonation} type='date' {...register('lastDonationDate')} />
        </div>

        {lastDonationDate && <p className='error-message'>{lastDonationDate.message as any}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!bloodType, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            Tipo de <b>Sangre</b>
          </h5>
          <select {...register('bloodType')}>
            <option defaultValue=''>...</option>
            {bloodTypeArr.map(bt => (
              <option key={bt} value={bt}>
                {bt}
              </option>
            ))}
          </select>
        </div>
        {bloodType && <p className='error-message'>{bloodType.message?.toString()}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!age, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            ¿Cual es tu <b>Edad</b>?
          </h5>
          <input autoComplete='off' {...register('age', { valueAsNumber: true })} />
        </div>
        {age && <p className='error-message'>{age.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!weight, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            ¿Cuanto estas <b>Pesando</b>?
          </h5>
          <div className='RDForm-section__linear'>
            <input autoComplete='off' id='RDFSec-linear' {...register('weight', { valueAsNumber: true })} />
            <label htmlFor='RDFSec-linear'>kg</label>
          </div>
        </div>
        {weight && <p className='error-message'>{weight.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!firstName, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            ¿Cuales son tus <b>Nombres</b>?
          </h5>
          <input autoComplete='off' {...register('firstName')} />
        </div>
        {firstName && <p className='error-message'>{firstName.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!lastName, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            ¿Cuales son tus <b>Apellidos</b>?
          </h5>
          <input autoComplete='off' {...register('lastName')} />
        </div>

        {lastName && <p className='error-message'>{lastName.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!dni, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            Agrega tu <b>DNI</b>
          </h5>
          <input autoComplete='off' {...register('dni')} />
        </div>

        {dni && <p className='error-message'>{dni.message}</p>}
      </section>
    </form>
  )
}

export default FormRegisterHero
