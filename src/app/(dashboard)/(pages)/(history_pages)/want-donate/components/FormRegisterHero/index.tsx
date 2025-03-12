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
    mode: 'onChange'
  })

  const heroLastDonation = heroDonations?.donations[heroDonations.donations.length - 1]?.donationDate

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = hookForm

  useEffect(() => {
    if (heroDonations) {
      const { person, patient } = heroDonations
      if (person && patient) {
        const lastDonation = heroDonations.donations.length > 0 ? dayjs(heroLastDonation).format('YYYY-MM-DD') : ''
        hookForm.reset({
          firstName: person.firstName,
          lastName: person.lastName,
          age: patient.age,
          bloodType: bloodTypeAbb[patient.bloodType as BloodType],
          weight: patient.weight,
          dni: patient.DNI,
          lastDonationDate: lastDonation
        })
      }
    }
  }, [heroDonations, hookForm])

  const onFormSubmit = async (data: IHeroRegisterRes) => {
    toast.loading('Te estamos registrando 🚀', { id: toastHeroId })

    const donDate = dayjs(data.donationDate)
    const lastDonDate = data.lastDonationDate ? dayjs(data.lastDonationDate) : donDate
    const parsedLastDonation = heroLastDonation ? dayjs(heroLastDonation) : donDate

    if (heroLastDonation) {
      if (donDate.isBefore(lastDonDate) || lastDonDate.isAfter(donDate) || donDate.isBefore(parsedLastDonation.add(2, 'month'))) {
        toast.error('Verifica las fechas de donación.', { id: toastHeroId })
        return
      }
      if (parsedLastDonation && !parsedLastDonation.isSame(lastDonDate)) {
        toast.error('Tu última fecha de donación no coincide con la registrada en el sistema.', { id: toastHeroId })
        return
      }
    }

    heroMutate(
      { body: { ...data, donationDate: donDate.toDate(), lastDonationDate: lastDonDate.toDate() } },
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

  const renderFormFields = () => {
    return [
      {
        label: 'Fecha de donación',
        name: 'donationDate',
        type: 'date',
        min: heroLastDonation ? dayjs(heroLastDonation).add(2, 'month').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
      },
      { label: 'Última Fecha de donación', name: 'lastDonationDate', type: 'date', disabled: !heroLastDonation },
      { label: 'Tipo de Sangre', name: 'bloodType', type: 'select', options: bloodTypeArr },
      { label: 'Edad', name: 'age', type: 'number' },
      { label: 'Peso', name: 'weight', type: 'number', suffix: 'kg' },
      { label: 'Nombres', name: 'firstName', type: 'text' },
      { label: 'Apellidos', name: 'lastName', type: 'text' },
      { label: 'DNI', name: 'dni', type: 'text' }
    ].map(({ label, name, type, min, disabled, options, suffix }) => (
      <section key={name} className={`RDForm-section ${acl(!!errors[name as keyof IHeroRegisterRes], 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>{label}</b>
          </h5>
          {type === 'select' ? (
            <select {...register(name as keyof IHeroRegisterRes)}>
              <option value=''>...</option>
              {options?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <div className='RDForm-section__linear'>
              <input autoComplete='off' type={type} {...register(name as keyof IHeroRegisterRes)} min={min} disabled={disabled} />
              {suffix && <label>{suffix}</label>}
            </div>
          )}
        </div>
        {errors[name as keyof IHeroRegisterRes] && (
          <p className='error-message'>{errors[name as keyof IHeroRegisterRes]?.message as string}</p>
        )}
      </section>
    ))
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
      {renderFormFields()}
    </form>
  )
}

export default FormRegisterHero
