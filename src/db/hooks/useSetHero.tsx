'use client'

import { fromDate } from '@/shared/time'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

import { getHeroDonations, setHero } from '../services/heroFetch'
import { ALL_DATA } from './keys'
import { useSetHistories } from './useHistory'

export const HERO_DONATIONS = 'hero-donations'

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
    onSuccess({ donor, donation }) {
      console.log('DATA---------', donor, donation)
      if (!donor || !donation) return toast.error('Algo salió mal, por favor intenta nuevamente', { id: toastId })

      const body = `<section class='history-hero'>
        <div class='history-hero__images'>
          <img src='/gorro.webp' alt='gorro navidad' />
          <img src='${donor.patient.person.photo}' alt='foto del paciente' />
        </div>
        <div class='history-hero__description'>
          <p>¡Te estamos esperando con mucho entusiasmo! 🎉</p> 
          <h5>${donor.patient.person.firstName} ${donor.patient.person.lastName}</h5>
          <h3>¡Ahora eres un <u>HÉROE</u>! 🦸‍♂️</h3>
          <p>Tu generosa donación de sangre será destinada para el:</p>
          <p>${dayjs(donation.donationDate).format('DD/MM/YYYY')}</p>
          <h5>${fromDate(donation.donationDate)}</h5>
        </div>
      </section>`
      historyMutate({ body })
      useQuery.invalidateQueries({ queryKey: [ALL_DATA, HERO_DONATIONS] })
      toast.success('Gracias por tu apoyo', { id: toastId })
    }
  })
  return { ...query }
}

export function useHeroDonations(userID: string | undefined) {
  const query = useQuery({
    queryKey: [HERO_DONATIONS, userID],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getHeroDonations(String(id))
    },
    staleTime: 1000,
    retry: 5,
    enabled: !!userID
  })
  return { ...query }
}
