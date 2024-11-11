'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import { BloodReceiverWithRel, PatientWithPerson } from '@/app/api/all/route'
import { useSetHistories } from '@/db/hooks/useHistory'
import { type IDniResolver, dniResolver } from '@/resolvers/dniResolver'
import { acl } from '@/shared/activeClass'
import { UserRoundSearchIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import './style.scss'

interface IValidateIDform {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  onSubmit: (donor: Partial<BloodReceiverWithRel>) => void
}

const ValidateIDform = ({ onSubmit }: IValidateIDform): JSX.Element => {
  const view = useChartView(s => s.view)
  const { data, status } = useStoreTrees()
  const hookForm = useForm<IDniResolver>({
    resolver: dniResolver,
    mode: 'onChange',
    defaultValues: {}
  })
  const { register, handleSubmit, formState, watch, getValues } = hookForm

  const { mutate } = useSetHistories()

  if (status === 'pending') return <p>Loading....</p>

  const { errors: e } = formState
  const ThereErrors = !!e.dni && watch('dni').length >= 1

  const onFormSubmit = async ({ dni }: IDniResolver) => {
    let currentNode = undefined
    if (view === 'tails') {
      currentNode = data.query?.patients.find(d => {
        return d.DNI == dni
      })
    } else currentNode = data.trees.pacientes.find(Number(dni)).node?.data
    onSubmit((currentNode as PatientWithPerson) ?? { DNI: getValues('dni') })
    if (!currentNode) return toast.error('No se encontraron resultados')

    const nodoData = currentNode as PatientWithPerson
    const bodyData = `<section class='history-section'>
        <img src='${nodoData.person.photo}' alt='patient search' />
        <div>
        <h5>Buscaste al paciente <br/> ${currentNode.person.firstName} ${currentNode?.person.lastName}
        </h5>
        <p>DNI: ${nodoData.DNI}</p>
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
