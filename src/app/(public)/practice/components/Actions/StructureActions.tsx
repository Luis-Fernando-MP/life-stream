import { Eraser, FilePenLine, PlusSquareIcon } from 'lucide-react'

import useMutablePracticeActions from '../../hooks/useMutablePracticeActions'
import AddDataPractice from '../AddDataPractice'

const StructureActions = ({ view }: { view: string }): JSX.Element => {
  const { addHead, updateHead, removeHead } = useMutablePracticeActions()
  const paragraphFromView = view === 'tree' ? 'Árbol' : 'Lista'
  return (
    <>
      <h4>ACCIONES:</h4>
      <div className='practiceActions-handles'>
        <button onClick={addHead} className='practiceActions-handle'>
          <PlusSquareIcon />
          <p>Agregar {paragraphFromView}</p>
        </button>
        <button onClick={removeHead} className='practiceActions-handle'>
          <Eraser />
          <p>Remover {paragraphFromView}</p>
        </button>
        <button onClick={updateHead} className='practiceActions-handle'>
          <FilePenLine />
          <p>Editar {paragraphFromView}</p>
        </button>
      </div>

      <section className='practiceActions-view'>
        <AddDataPractice />
      </section>
    </>
  )
}

export default StructureActions
