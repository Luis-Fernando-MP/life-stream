'use client'

import { PatientWithPerson } from '@/app/api/allData/route'
import { useSetReceptors } from '@/db/hooks/useSetReceptors'
import { IDonorsRegisterRes } from '@/resolvers/donorsRegisterResolver'
import { IReceptorRegisterResolver, receptorRegisterResolver } from '@/resolvers/receptorRegisterResolver'
import { acl } from '@/shared/activeClass'
import { bloodTypeArr, getBloodType } from '@/shared/getBloodType'
import ImageUploader from '@/shared/ui/ImageUploader'
import dayjs from 'dayjs'
import { type JSX, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IFormRegisterDonor {
  patient: Partial<PatientWithPerson>
  className?: string
  setDonor: () => void
}

const FormRegisterReceptor = ({ className, patient, setDonor }: IFormRegisterDonor): JSX.Element => {
  const toastReceptorId = 'id-receptor-modal'
  const { mutate: receptorsMutate } = useSetReceptors(toastReceptorId)
  const hookForm = useForm<IReceptorRegisterResolver>({
    resolver: receptorRegisterResolver,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { reset } = hookForm

  useEffect(() => {
    reset()
    const defaultValues = {
      bloodType: getBloodType(patient?.bloodType)?.abbreviation,
      age: patient?.age,
      weight: patient?.weight,
      dni: patient?.DNI,
      firstName: patient?.person?.firstName,
      lastName: patient?.person?.lastName,
      lastDonationDate: dayjs().format('YYYY-MM-DD'),
      photo: patient?.person?.photo
    }
    reset(defaultValues as any)
  }, [patient, reset])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    watch
  } = hookForm

  const { age, bloodType, dni, firstName, lastName, weight, photo } = errors

  const onFormSubmit = async (data: IDonorsRegisterRes) => {
    toast.loading('Guardando receptor de sangre...', { id: toastReceptorId, duration: Infinity })
    receptorsMutate({
      body: {
        ...data,
        lastDonationDate: dayjs(data.lastDonationDate).toDate(),
        patientId: patient?.id ?? null,
        personId: patient?.person?.id ?? null
      }
    })
    setDonor()
  }

  const onErrors = () => {
    toast.error('Completa los campos requeridos')
  }

  return (
    <form className={`${className} RDForm`} onSubmit={handleSubmit(onFormSubmit, onErrors)}>
      <button className='RDForm-submit' type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'AGREGAR'}
      </button>

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
            <b>Edad</b> del receptor
          </h5>
          <input autoComplete='off' {...register('age', { valueAsNumber: true })} />
        </div>
        {age && <p className='error-message'>{age.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!weight, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Peso</b> del receptor
          </h5>
          <div className='RDForm-section__linear'>
            <input autoComplete='off' id='RDFSec-linear' {...register('weight', { valueAsNumber: true })} />
            <label htmlFor='RDFSec-linear'>kg</label>
          </div>
        </div>
        {weight && <p className='error-message'>{weight.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!photo, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Foto</b> del receptor
          </h5>
          <ImageUploader
            defaultImage={watch('photo')}
            onLoad={image => {
              setValue('photo', image)
              trigger('photo')
            }}
          />
        </div>

        {photo && <p className='error-message'>{photo.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!firstName, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Nombres</b> del receptor
          </h5>
          <input autoComplete='off' {...register('firstName')} />
        </div>
        {firstName && <p className='error-message'>{firstName.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!lastName, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>Apellidos</b> del receptor
          </h5>
          <input autoComplete='off' {...register('lastName')} />
        </div>

        {lastName && <p className='error-message'>{lastName.message}</p>}
      </section>

      <section className={`RDForm-section ${acl(!!dni, 'error')}`}>
        <div className='RDForm-section__field'>
          <h5>
            <b>DNI</b> del receptor
          </h5>
          <input autoComplete='off' {...register('dni')} />
        </div>

        {dni && <p className='error-message'>{dni.message}</p>}
      </section>
    </form>
  )
}

export default FormRegisterReceptor
