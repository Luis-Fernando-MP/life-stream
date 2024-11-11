'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import { BloodReceiverWithRel } from '@/app/api/all/route'
import { HISTORY } from '@/db/hooks/keys'
import { setUserHistory } from '@/db/services/history'
import { type IDniResolver, dniResolver } from '@/resolvers/dniResolver'
import { acl } from '@/shared/activeClass'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { UserRoundSearchIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IValidateIDform {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  onSubmit: (donor: BloodReceiverWithRel) => void
}

const ValidateIDform = ({ onSubmit }: IValidateIDform): JSX.Element => {
  const queryClient = useQueryClient()
  const view = useChartView(s => s.view)
  const { data, status } = useStoreTrees()
  const hookForm = useForm<IDniResolver>({
    resolver: dniResolver,
    mode: 'onChange',
    defaultValues: {}
  })
  const { register, handleSubmit, formState, watch, getValues } = hookForm

  const { mutate } = useMutation({
    mutationFn: setUserHistory,
    onError() {
      toast.error('Hemos fallado al actualizar el historial')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [HISTORY] })
      toast.success('Se actualizo el historial')
    },
    retry: 3
  })

  if (status === 'pending') return <p>Loading....</p>

  const { errors: e } = formState
  const ThereErrors = !!e.dni && watch('dni').length >= 1

  const onFormSubmit = async ({ dni }: IDniResolver) => {
    let currentNode = undefined
    if (view === 'tails') {
      currentNode = data.query?.bloodDonors.find(d => {
        return d.patient.DNI == dni
      })
    } else currentNode = data.trees.donantes.find(Number(dni)).node?.data

    onSubmit((currentNode as BloodReceiverWithRel) ?? { patient: { DNI: getValues('dni') } })
    if (!currentNode) return toast.error('No se encontraron resultados')

    const nodoData = currentNode as BloodReceiverWithRel
    const bodyData = `<section class='history-section'>
        <img src="${nodoData.patient.person.photo}" alt='user-search' />
        <div>
        <h5>Buscaste al donante ${currentNode.patient.person.firstName} ${currentNode?.patient.person.lastName}
        </h5>
        <p>Fecha de donación: ${dayjs(currentNode?.lastDonation).format('YYYY/MM/DD')}</p>
        </div>
    </section>`

    mutate({ body: bodyData })
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
      <button
        type='submit'
        disabled={ThereErrors}
        className={`dniForm-submit ${acl(ThereErrors, 'error')}`}
      >
        BUSCAR PACIENTE
      </button>
    </form>
  )
}

export default ValidateIDform
