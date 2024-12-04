'use client'

import { fromDate } from '@/shared/time'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

import { setHero } from '../services/heroFetch'
import { ALL_DATA } from './keys'
import { useSetHistories } from './useHistory'

export function useSetHero(toastId: string) {
  const useQuery = useQueryClient()
  const { mutate: historyMutate } = useSetHistories()
  const query = useMutation({
    mutationFn: setHero,
    retry: 3,
    onError(error) {
      console.error('error', error)
      toast.error('Estamos teniendo problemas, gustas en reintentarlo?', { id: toastId })
    },
    onSuccess(data) {
      if (!data) return toast.error('Algo  a salido mal :c', { id: toastId })

      const body = `<section class='history-hero'>
        <div class='history-hero__images'>
          <img src='/gorro.webp' alt='gorro navidad' />
          <img src='${data?.donor.patient.person.photo}' alt='foto del paciente' />
        </div>
        <div class='history-hero__description'>
          <p>¡Te estamos esperando con mucho entusiasmo! 🎉</p> 
          <h5>${data?.donor.patient.person.firstName} ${data?.donor.patient.person.lastName}</h5>
          <h3>¡Ahora eres un <u>HÉROE</u>! 🦸‍♂️</h3>
          <p>Tu generosa donación de sangre será destinada para el:</p>
          <p>${dayjs(data?.donation.donationDate).format('DD/MM/YYYY')}</p>
          <h4>${fromDate(data?.donation.donationDate)}</h4>
        </div>
      </section>`
      historyMutate({ body })
      useQuery.invalidateQueries({ queryKey: [ALL_DATA] })
      toast.success('Gracias por tu apoyo', { id: toastId, duration: 2000 })
    }
  })
  return { ...query }
}
