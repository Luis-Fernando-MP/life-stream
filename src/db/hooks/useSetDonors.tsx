import { useMutation } from '@tanstack/react-query'

import { setUseDonors } from '../services/donorsFetch'

export function useSetDonors() {
  const query = useMutation({
    mutationFn: setUseDonors,
    retry: 3
  })

  return { ...query }
}
