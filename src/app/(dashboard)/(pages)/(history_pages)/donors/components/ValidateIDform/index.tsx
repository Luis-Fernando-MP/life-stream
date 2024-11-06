'use client'

import { findBloodDonor } from '@/db/services/getBloodDonors'
import { type IDniResolver, dniResolver } from '@/resolvers/dniResolver'
import { acl } from '@/shared/activeClass'
import { useMutation } from '@tanstack/react-query'
import { UserRoundSearchIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IValidateIDform {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  onSubmit: () => void
}

const ValidateIDform = ({ onSubmit }: IValidateIDform): JSX.Element => {
  const hookForm = useForm<IDniResolver>({
    resolver: dniResolver,
    mode: 'onChange',
    defaultValues: {}
  })
  const { register, handleSubmit, formState, watch } = hookForm
  const { errors: e } = formState
  const ThereErrors = !!e.dni && watch('dni').length >= 1

  const mutation = useMutation({
    mutationFn: findBloodDonor,
    onError(error) {
      console.log(error)
    },
    onSuccess: (data: any) => {
      console.log(data)
    },
    retry: 5
  })

  const onFormSubmit = async ({ dni }: IDniResolver) => {
    mutation.mutate(dni)
    onSubmit()
  }
  const onErrors = () => {
    toast.error('completa los requerimientos')
  }

  return (
    <form className='dniForm' onSubmit={handleSubmit(onFormSubmit, onErrors)}>
      <div className={`dniForm-field ${acl(ThereErrors, 'error')}`}>
        <UserRoundSearchIcon className='dniForm-icon' />
        <input placeholder='DNI: 12345678' autoComplete='off' {...register('dni')} />
      </div>
      {ThereErrors && <p className='dniForm-error'>{e.dni?.message}</p>}
      <button type='submit' disabled={ThereErrors} className='dniForm-submit'>
        VERIFICAR
      </button>
    </form>
  )
}

export default ValidateIDform
