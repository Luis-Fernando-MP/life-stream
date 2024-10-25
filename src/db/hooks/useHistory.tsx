import { useQuery } from '@tanstack/react-query'

import { fetchHistories } from '../actions/history'
import { HISTORY } from './keys'

export function usePersonHistories(userID: string | undefined) {
  const query = useQuery({
    queryKey: [HISTORY, userID],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await fetchHistories(String(id))
    },
    staleTime: 2000,
    retry: 5,
    enabled: !!userID
  })
  return { ...query }
}
