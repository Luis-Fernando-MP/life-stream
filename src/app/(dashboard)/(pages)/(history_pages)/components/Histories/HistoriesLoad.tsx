'use client'

import { usePersonHistories } from '@/db/hooks/useHistory'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

import History from '../History'

const HistoriesLoad = () => {
  const { user } = useUser()
  const { data, isLoading } = usePersonHistories(user?.id)
  useEffect(() => {
    const historiesRef = document.querySelector('article.layout-histories.histories')
    if (historiesRef) historiesRef.scrollTop = historiesRef.scrollHeight
  }, [data])
  if (isLoading) return <p>Loading...</p>
  if (!data) return null

  return (
    <>
      {data.map((h, i) => (
        <History key={h.id} history={h} i={i} />
      ))}
    </>
  )
}

export default HistoriesLoad
