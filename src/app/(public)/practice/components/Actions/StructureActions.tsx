import { acl } from '@/shared/activeClass'
import { Eraser, FilePenLine, PlusSquareIcon } from 'lucide-react'
import { useState } from 'react'

import AddDataPractice from '../AddDataPractice'
import AddNewPracticeHead from '../AddDataPractice/AddNewPracticeHead'

export type prViews = 'Agregar' | 'Remover' | 'Actualizar' | 'ActualizarNodo'

const StructureActions = ({ view }: { view: string }): JSX.Element => {
  const [prView, setPrView] = useState<prViews>('Agregar')

  const paragraphFromView = view === 'tree' ? 'Árbol' : 'Lista'
  return (
    <>
      <h4>ACCIONES:</h4>
      <div className='practiceActions-handles'>
        <button
          onClick={() => setPrView('Agregar')}
          className={`practiceActions-handle ${acl(prView === 'Agregar')}`}
        >
          <PlusSquareIcon />
          <p>Agregar {paragraphFromView}</p>
        </button>
        <button
          onClick={() => setPrView('Remover')}
          className={`practiceActions-handle ${acl(prView === 'Remover')}`}
        >
          <Eraser />
          <p>Remover {paragraphFromView}</p>
        </button>
        <button
          onClick={() => setPrView('Actualizar')}
          className={`practiceActions-handle ${acl(prView === 'Actualizar')}`}
        >
          <FilePenLine />
          <p>Editar {paragraphFromView}</p>
        </button>
      </div>

      <section className='practiceActions-view'>
        <h4>
          {prView} {paragraphFromView}
        </h4>
        <AddNewPracticeHead type={prView} />
      </section>

      <section className='practiceActions-view'>
        <AddDataPractice />
      </section>
    </>
  )
}

export default StructureActions
