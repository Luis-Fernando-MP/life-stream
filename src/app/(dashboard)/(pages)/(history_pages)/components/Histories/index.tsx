'use client'

import { HISTORY } from '@/db/hooks/keys'
import { useQueryClient } from '@tanstack/react-query'
import { EraserIcon } from 'lucide-react'
import toast from 'react-hot-toast'

import HistoryButtons from '../HistoryButtons'
import HistoriesLoad from './HistoriesLoad'
import { cleanHistory } from './actions'
import './style.scss'

interface IHistories {
  className?: string
}

const Histories = ({ className }: IHistories) => {
  const useQuery = useQueryClient()
  const clearHistory = async () => {
    try {
      const id = toast.loading('Borrando historial...')
      await cleanHistory()
      toast.success('Historial limpio', { id })
      useQuery.invalidateQueries({
        queryKey: [HISTORY]
      })
    } catch (error) {
      console.error('....', error)
    }
  }

  return (
    <article className={`${className} histories`}>
      <header className='histories-actions'>
        <button className='histories-action' onClick={clearHistory}>
          <EraserIcon />
          <p>Limpiar historial</p>
        </button>
        <HistoryButtons />
      </header>
      <section className='histories-data'>
        <HistoriesLoad />
      </section>
    </article>
  )
}

export default Histories
