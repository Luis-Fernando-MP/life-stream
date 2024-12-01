import RedBlackTree from '@/shared/tree/RedBlackTree'
import useChartView from '@pages/chart/hooks/useChartView'
import { TriangleAlert } from 'lucide-react'
import { FormEvent, JSX, memo, useState } from 'react'
import toast from 'react-hot-toast'

import useMutablePracticeActions from '../../hooks/useMutablePracticeActions'
import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import { prViews } from '../Actions/StructureActions'
import './style.scss'

const MutablePracticeHead = ({ type }: { type: prViews }): JSX.Element => {
  const { tails, setTrees, trees, setTails } = usePracticeStoreTrees()
  const view = useChartView(s => s.view)
  const paragraphView = view === 'tree' ? 'Árbol' : 'Lista'

  const [headName, setHeadName] = useState('')

  const addNewTreeHead = () => {
    const newTree = new RedBlackTree()
    if (!trees[headName]) {
      toast.success('Árbol agregado correctamente')
      return setTrees({ ...trees, [headName.toLowerCase()]: newTree })
    }
    toast(t => (
      <div className='flex items-center justify-center gap-3'>
        <button
          className='inline-flex items-center rounded-full bg-yellow-500 p-1 font-bold text-black hover:bg-yellow-600'
          onClick={() => {
            toast.success('Árbol actualizado correctamente')
            toast.dismiss(t.id)
            return setTrees({ ...trees, [headName.toLowerCase()]: newTree })
          }}
        >
          <TriangleAlert />
        </button>
        <div className='w-full'>
          <h5>
            Este nombre de cabeza ya <i>existe</i> quieres actualizarlo
          </h5>
          <p>Preciosa el Boton izquierdo</p>
        </div>
      </div>
    ))
  }

  const addNewListHead = () => {
    if (!tails[headName]) {
      toast.success('Árbol agregado correctamente')
      return setTails({ ...tails, [headName.toLowerCase()]: [] })
    }
    toast(t => (
      <div className='flex items-center justify-center gap-3'>
        <button
          className='inline-flex items-center rounded-full bg-yellow-500 p-1 font-bold text-black hover:bg-yellow-600'
          onClick={() => {
            toast.success('Lista actualizado correctamente')
            toast.dismiss(t.id)
            return setTails({ ...tails, [headName.toLowerCase()]: [] })
          }}
        >
          <TriangleAlert />
        </button>
        <div className='w-full'>
          <h5>
            Este nombre de cabeza ya <i>existe</i> quieres actualizarlo
          </h5>
          <p>Preciosa el Boton izquierdo</p>
        </div>
      </div>
    ))
  }

  const handleAddNewNode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (type === 'Agregar') {
      if (!headName || /[^a-zA-Z0-9\s]/.test(headName)) {
        ;(e.target as HTMLInputElement).focus()
        return toast.error('Asegúrate de no usar caracteres especiales')
      }
      if (view === 'tree') return addNewTreeHead()
      return addNewListHead()
    }
    if (type === 'Remover') {
    }
  }

  return (
    <form onSubmit={handleAddNewNode} className='addDataPractice-form'>
      <button type='submit' className='addDataPractice-submit'>
        {type.toUpperCase()} {paragraphView.toUpperCase()}
      </button>

      <section className='addDataPractice-form__field'>
        <div className='addDataPractice-form__field'>
          <p>
            Nombre {view === 'tree' ? 'del' : 'de la'} {paragraphView}
          </p>
          <input
            autoComplete='off'
            value={headName}
            onChange={e => setHeadName(e.target.value.trim())}
          />
        </div>
      </section>
    </form>
  )
}

export default memo(MutablePracticeHead)
