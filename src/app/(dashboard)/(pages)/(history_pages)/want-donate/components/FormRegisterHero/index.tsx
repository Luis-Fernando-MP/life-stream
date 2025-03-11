'use client'

import { useSetHero } from '@/db/hooks/useSetHero'
import { IHeroRegisterRes, heroRegisterResolver } from '@/resolvers/heroRegisterResolver'
import { acl } from '@/shared/activeClass'
import { bloodTypeArr } from '@/shared/getBloodType'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type JSX } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IFormRegisterHero {
  className?: string
}

const FormRegisterHero = ({ className }: IFormRegisterHero): JSX.Element => {
  const toastHeroId = 'id-donors-modal'
  const { mutate: heroMutate } = useSetHero(toastHeroId)
  const { push } = useRouter()
  const hookForm = useForm<IHeroRegisterRes>({
    resolver: heroRegisterResolver,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = hookForm

  const { age, bloodType, dni, firstName, donationDate, lastName, weight, lastDonationDate } = errors

  const onFormSubmit = async ({ donationDate, lastDonationDate, ...data }: IHeroRegisterRes) => {
    toast.loading('Te estamos registrando :D', { id: toastHeroId, duration: Infinity })
    heroMutate(
      {
        body: {
          ...data,
          donationDate: dayjs(donationDate).toDate(),
          lastDonationDate: !lastDonationDate ? dayjs(donationDate).toDate() : dayjs(lastDonationDate).toDate()
        }
      },
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
    <form className={`${className} RDForm animate-fade-in-up`} onSubmit={handleSubmit(onFormSubmit, onErrors)}>
      <Link href='/want-donate/details' className='RDForm-link'>
        Quiero ver mis fechas de donación
      </Link>
      <button className='RDForm-submit' type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'DONAR AHORA'}
      </button>

      <section className={`RDForm-section ${acl(!!donationDate, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Fecha</b> de <b>donación</b>
          </h5>
          <input type='date' {...register('donationDate')} />
        </div>

        {donationDate && <p className='error-message'>{donationDate.message as any}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!lastDonationDate, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Última Fecha</b> de <b>donación</b>
          </h5>
          <input type='date' {...register('lastDonationDate')} />
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
