'use client'

import { usePersonHistories } from '@/db/hooks/useHistory'
import { useUser } from '@clerk/nextjs'

import History from '../History'

const HistoriesLoad = () => {
  const { user } = useUser()
  const { data, isLoading } = usePersonHistories(user?.id)
  if (isLoading) return <p>Loading...</p>
  if (!data) return null

  return (
    <>
      {[...data, ...data, ...data].map((h, i) => (
        <History key={h.id} history={h} i={i} />
      ))}
    </>
  )
}

export default HistoriesLoad
