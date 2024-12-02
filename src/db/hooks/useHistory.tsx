import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { fetchHistories, setUserHistory } from '../services/history'
import { HISTORY } from './keys'

export function usePersonHistories(userID: string | undefined) {
  const query = useQuery({
    queryKey: [HISTORY, userID],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await fetchHistories(String(id))
    },
    staleTime: 10000,
    retry: 5,
    enabled: !!userID
  })
  return { ...query }
}

interface UseSetHistoriesOptions {
  onSuccess?: () => void
  onError?: () => void
}

export function useSetHistories({ onSuccess, onError }: UseSetHistoriesOptions = {}) {
  const queryClient = useQueryClient()
  const query = useMutation({
    mutationFn: setUserHistory,
    onError: () => {
      toast.error('Hemos fallado al actualizar el historial')
      if (onError) onError()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [HISTORY] })
      toast.success('Se actualizó el historial')
      if (onSuccess) onSuccess()
    },
    retry: 3
  })

  return { ...query }
}
