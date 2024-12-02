'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { setUseDonors } from '../services/donorsFetch'
import { ALL_DATA } from './keys'
import { useSetHistories } from './useHistory'

export function useSetDonors(toastId: string) {
  const useQuery = useQueryClient()
  const { mutate: historyMutate } = useSetHistories()
  const query = useMutation({
    mutationFn: setUseDonors,
    retry: 3,
    onError(error) {
      console.error('error', error)
      toast.error('error al crear el donante', { id: toastId })
    },
    onSuccess(data) {
      const body = `<section class='history-section'>
        <img src='${data?.donor.patient.person.photo}' alt='patient search' />
        <div>
          <h5>Creaste al donante <br/> ${data?.donor.patient.person.firstName} ${data?.donor.patient.person.lastName}
          </h5>
          <p>DNI: ${data?.donor.patient.DNI}</p>
        </div>
        </section>`
      historyMutate({ body })
      useQuery.invalidateQueries({ queryKey: [ALL_DATA] })
      toast.success('Donante creado', { id: toastId, duration: 2000 })
    }
  })
  return { ...query }
}
