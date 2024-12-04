import { useQuery } from '@tanstack/react-query'

import { getDonations } from '../services/getDonations'
import { BLOOD_DONATIONS } from './keys'

export function useBloodDonations() {
  const query = useQuery({
    queryKey: [BLOOD_DONATIONS],
    queryFn: getDonations,
    staleTime: 2000,
    retry: 3
  })
  return { ...query }
}
