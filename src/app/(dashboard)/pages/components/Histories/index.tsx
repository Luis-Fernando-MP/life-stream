'use client'

import { usePersonHistories } from '@/db/hooks/useHistory'
import { useUser } from '@clerk/nextjs'
import { DatabaseZapIcon, EraserIcon } from 'lucide-react'
import type { JSX } from 'react'

import History from '../History'
import './style.scss'

const Histories = (): JSX.Element | null => {
  const { user } = useUser()
  const { status, data } = usePersonHistories(user?.id)
  if (!data) return null

  return (
    <article className='dhHistory'>
      <section className='dhHistory-data'>
        {data?.map(h => <History key={h.id} history={h} />)}
      </section>
      <footer className='dhHistory-actions'>
        <button className='dhHistory-action'>
          <EraserIcon />
          <h5>Limpiar historial</h5>
        </button>
        <button className='dhHistory-action'>
          <DatabaseZapIcon />
          <h5>Guardar historial</h5>
        </button>
      </footer>
    </article>
  )
}

export default Histories
