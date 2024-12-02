import { useQuery } from '@tanstack/react-query'

import { getAllData } from '../services/getAllData'
import { ALL_DATA } from './keys'

export function useAllData() {
  const query = useQuery({
    queryKey: [ALL_DATA],
    queryFn: () => getAllData(),
    staleTime: 2000,
    retry: 3
  })
  return { ...query }
}
