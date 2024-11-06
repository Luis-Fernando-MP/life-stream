import Logo from '@/shared/ui/Logo'
import { QueryHistory } from '@prisma/client'
import type { JSX } from 'react'

import HistoryButtons from '../HistoryButtons'
import './style.scss'

interface IHistory {
  history: QueryHistory
  i: number
}

const History = ({ history, i }: IHistory): JSX.Element => {
  return (
    <section className='history animate-fade-in-up' style={{ animationDelay: `${i * 0.5}s` }}>
      <article className='history-data'>
        <Logo />
        <div className='history-body'>
          <p dangerouslySetInnerHTML={{ __html: history.description }} />
        </div>
      </article>
      <HistoryButtons />
    </section>
  )
}

export default History
