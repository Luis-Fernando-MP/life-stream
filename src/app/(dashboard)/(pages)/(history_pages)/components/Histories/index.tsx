import { DatabaseZapIcon, EraserIcon } from 'lucide-react'

import HistoriesLoad from './HistoriesLoad'
import './style.scss'

interface IHistories {
  className?: string
}

const Histories = ({ className }: IHistories) => {
  return (
    <article className={`${className} histories`}>
      <header className='histories-actions'>
        <button className='histories-action'>
          <EraserIcon />
          <p>Limpiar historial</p>
        </button>
        <button className='histories-action'>
          <DatabaseZapIcon />
          <p>Guardar historial</p>
        </button>
      </header>
      <section className='histories-data'>
        <HistoriesLoad />
      </section>
    </article>
  )
}

export default Histories
