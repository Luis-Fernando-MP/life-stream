'use client'

import RedBlackTree from '@/shared/tree/RedBlackTree'
import useChartView from '@pages/chart/hooks/useChartView'
import { FormEvent, JSX, memo, useState } from 'react'
import toast from 'react-hot-toast'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const AddNewPracticeHead = ({ type }: { type: prViews }): JSX.Element => {
  const { tails, setTrees, trees, setTails } = usePracticeStoreTrees()
  const view = useChartView(s => s.view)
  const paragraphView = view === 'tree' ? 'Árbol' : 'Lista'

  const [headName, setHeadName] = useState('')

  const validateName = (name: string): boolean => {
    return /^[a-zA-Z0-9\-_]+$/.test(name)
  }

  const handleAddNewNode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!headName || !validateName(headName)) {
      return toast.error('Nombre inválido. Usa solo letras, números, guiones "-" o "_"')
    }

    switch (type) {
      case 'Agregar':
        return view === 'tree' ? addNewTreeHead() : addNewListHead()
      case 'Remover':
        return view === 'tree' ? removeTreeHead() : removeListHead()
      case 'Actualizar':
        return view === 'tree' ? updateTreeName() : undefined
      case 'ActualizarNodo':
        return view === 'tree' ? updateTreeNode() : undefined
      default:
        return toast.error('Acción no reconocida.')
    }
  }

  const promptWithToast = (message: string, onConfirm: (value: string) => void) => {
    const inputRef = document.createElement('input')
    inputRef.className = 'border rounded p-2 w-full text-black'
    toast(t => (
      <div className='flex flex-col gap-2 text-black'>
        <h5 className='font-bold'>{message}</h5>
        <div className='flex gap-2'>
          <input
            ref={ref => ref && ref.focus()}
            className='w-full rounded border p-2'
            placeholder='Ingresa aquí'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value.trim()
                if (value) onConfirm(value)
                toast.dismiss(t.id)
              }
            }}
          />
          <button
            onClick={() => {
              const value = inputRef.value.trim()
              if (value) onConfirm(value)
              toast.dismiss(t.id)
            }}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Confirmar
          </button>
        </div>
      </div>
    ))
  }

  const addNewTreeHead = () => {
    if (trees[headName.toLowerCase()]) {
      return toast.error('El árbol ya existe.')
    }
    const newTree = new RedBlackTree()
    setTrees({ ...trees, [headName.toLowerCase()]: newTree })
    toast.success('Árbol agregado correctamente')
  }

  const addNewListHead = () => {
    if (tails[headName.toLowerCase()]) {
      return toast.error('La lista ya existe.')
    }
    setTails({ ...tails, [headName.toLowerCase()]: [] })
    toast.success('Lista agregada correctamente')
  }

  const updateTreeName = () => {
    if (!trees[headName.toLowerCase()]) {
      return toast.error('El árbol no existe.')
    }

    promptWithToast('Ingresa el nuevo nombre del árbol:', newName => {
      if (!validateName(newName)) {
        return toast.error('Nombre inválido. Usa solo letras, números, guiones "-" o "_"')
      }

      const updatedTrees = { ...trees }
      updatedTrees[newName.toLowerCase()] = updatedTrees[headName.toLowerCase()]
      delete updatedTrees[headName.toLowerCase()]
      setTrees(updatedTrees)
      toast.success('Nombre del árbol actualizado correctamente')
    })
  }

  const updateTreeNode = () => {
    const tree = trees[headName.toLowerCase()]
    if (!tree) {
      return toast.error('El árbol no existe.')
    }

    promptWithToast('Ingresa el ID del nodo:', nodeIdStr => {
      const nodeId = parseInt(nodeIdStr, 10)
      if (isNaN(nodeId)) {
        return toast.error('ID de nodo inválido.')
      }

      promptWithToast('Ingresa los nuevos datos del nodo (formato JSON):', newNodeData => {
        try {
          const parsedData = JSON.parse(newNodeData)
          tree.update(nodeId, parsedData)
          setTrees({ ...trees, [headName.toLowerCase()]: tree })
          toast.success('Nodo actualizado correctamente')
        } catch {
          toast.error('Formato JSON inválido.')
        }
      })
    })
  }

  const removeTreeHead = () => {
    if (!trees[headName.toLowerCase()]) {
      return toast.error('El árbol no existe.')
    }
    setTrees(prev => {
      const updated = { ...prev }
      delete updated[headName.toLowerCase()]
      return updated
    })
    toast.success('Árbol eliminado correctamente')
  }

  const removeListHead = () => {
    if (!tails[headName.toLowerCase()]) {
      return toast.error('La lista no existe.')
    }
    setTails(prev => {
      const updated = { ...prev }
      delete updated[headName.toLowerCase()]
      return updated
    })
    toast.success('Lista eliminada correctamente')
  }

  return (
    <form onSubmit={handleAddNewNode} className='addDataPractice-form'>
      <button
        type='submit'
        className='addDataPractice-submit bg-blue-500 text-white hover:bg-blue-600'
      >
        {type.toUpperCase()} {paragraphView.toUpperCase()}
      </button>

      <section className='addDataPractice-form__field text-black'>
        <p>
          Nombre {view === 'tree' ? 'del' : 'de la'} {paragraphView}
        </p>
        <input
          autoComplete='off'
          value={headName}
          onChange={e => setHeadName(e.target.value.trim())}
          className='rounded border p-2 text-black'
        />
      </section>
    </form>
  )
}

export default memo(AddNewPracticeHead)
