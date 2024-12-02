'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { setReceptorsFetch } from '../services/receptorsFetch'
import { ALL_DATA } from './keys'
import { useSetHistories } from './useHistory'

export function useSetReceptors(toastId: string) {
  const useQuery = useQueryClient()
  const { mutate: historyMutate } = useSetHistories()
  const query = useMutation({
    mutationFn: setReceptorsFetch,
    retry: 3,
    onMutate() {
      toast.loading('Creando receptor de sangre', { id: toastId })
    },
    onError(error) {
      console.log('error', error)
      toast.error('Error al crear el receptor de sangre', { id: toastId })
    },
    onSuccess(data) {
      useQuery.invalidateQueries({
        queryKey: [ALL_DATA]
      })
      const body = `<section class='history-section'>
        <img src='${data?.receptor.patient.person.photo}' alt='patient search' />
        <div>
          <h5>Creaste al receptor <br/> ${data?.receptor.patient.person.firstName} ${data?.receptor.patient.person.lastName}
          </h5>
          <p>DNI: ${data?.receptor.patient.DNI}</p>
        </div>
        </section>`
      historyMutate({ body })
      toast.success('Receptor creado', { id: toastId, duration: 2000 })
    }
  })

  return { ...query }
}
