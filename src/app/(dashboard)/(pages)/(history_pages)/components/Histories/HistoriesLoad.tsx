'use client'

import { usePersonHistories } from '@/db/hooks/useHistory'
import { useUser } from '@clerk/nextjs'

import History from '../History'

const HistoriesLoad = () => {
  const { user } = useUser()
  const { status, data } = usePersonHistories(user?.id)
  if (!data) return null

  return (
    <>
      {[...data, ...data, ...data].map(h => (
        <History key={h.id} history={h} />
      ))}
    </>
  )
}

export default HistoriesLoad
