import { useQuery } from '@tanstack/react-query'

import { findBloodDonor } from '../actions/bloodDonors'
import { HISTORY } from './keys'

export function useBloodDonors(dni: string | undefined) {
  const query = useQuery({
    queryKey: [HISTORY, dni],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await findBloodDonor(String(id))
    },
    staleTime: 2000,
    retry: 5,
    enabled: !!dni
  })
  return { ...query }
}
