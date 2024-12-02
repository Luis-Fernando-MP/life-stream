import { HISTORY } from '@/db/hooks/keys'
import { deleteUserHistory } from '@/db/services/history'
import Logo from '@/shared/ui/Logo'
import { QueryHistory } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, LoaderCircle, Trash2 } from 'lucide-react'
import { type JSX, useRef } from 'react'
import toast from 'react-hot-toast'

import './style.scss'

interface IHistory {
  history: QueryHistory
  i: number
}

const History = ({ history, i }: IHistory): JSX.Element => {
  const query = useQueryClient()
  const historyRef = useRef<HTMLElement>(null)
  const deleteToastID = 'deleteToastID'
  const { mutate, status } = useMutation({
    mutationFn: deleteUserHistory,
    onError() {
      toast.error('No se pudo eliminar la historia')
    },
    onSuccess: async () => {
      await query.invalidateQueries({
        queryKey: [HISTORY]
      })

      if (historyRef.current) {
        const node = historyRef.current
        const parent = node.parentElement
        node.addEventListener('animationend', () => {
          if (parent && node) {
            parent.removeChild(node)
          }
        })
      }

      toast.success('Historia borrada', { id: deleteToastID })
    }
  })

  const handleDelete = (): void => {
    toast.loading('Borrando historia...', { id: deleteToastID })
    if (status === 'pending') return
    historyRef.current?.classList.add('remove')
    mutate({
      body: {
        id: history.id
      }
    })
  }

  return (
    <section
      className='history animate-fade-in-up'
      style={{ animationDelay: `${0.5 / i}s` }}
      ref={historyRef}
    >
      <article className='history-data'>
        <div className='history-data-left'>
          <Logo />
          <button onClick={handleDelete} disabled={status === 'pending'} className={status}>
            {status === 'pending' && <LoaderCircle />}
            {status === 'success' && <Check />}
            {status === 'idle' && <Trash2 />}
          </button>
        </div>
        <div className='history-body'>
          <div dangerouslySetInnerHTML={{ __html: history.description }} />
        </div>
      </article>
    </section>
  )
}

export default History
