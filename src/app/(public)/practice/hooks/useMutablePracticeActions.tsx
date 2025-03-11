'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import RedBlackTree from '@/shared/tree/RedBlackTree'
import { validateName } from '@/shared/validateName'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { promptOnlyNodesToast, promptWithNodesToast, promptWithToast } from '../components/PromptWithToast'
import usePracticeStoreTrees from './usePracticeStoreTrees'

const useMutablePracticeActions = () => {
  const view = useChartView(s => s.view)
  const { trees, setTrees, tails, setTails } = usePracticeStoreTrees()
  const [headName, setHeadName] = useState('')

  const addHead = () => {
    if (view === 'tree') return addTreeHead()
    addListHead()
  }

  const addTreeHead = () => {
    const newTree = new RedBlackTree()
    promptWithToast(<h5>🌳 ¡Hora de plantar un nuevo Árbol! ¿Cuál será su nombre?</h5>, val => {
      if (!trees[val.toLowerCase()]) {
        setTrees({ ...trees, [val.toLowerCase()]: newTree })
        return toast.success('🎉 ¡Árbol agregado exitosamente!')
      }
      const newTrees = { ...trees }
      const prevTreeNodes = newTrees[val.toLowerCase()]
      delete newTrees[val.toLowerCase()]

      promptWithToast(
        <div>
          <h5>⚠️ El nombre del árbol ya existe. ¿Deseas renombrarlo?</h5>
          <p>🌱 Por favor, escribe su nuevo nombre:</p>
        </div>,
        val => {
          newTrees[val.toLowerCase()] = prevTreeNodes
          setTrees(newTrees)
          return toast.success('✅ ¡Árbol renombrado correctamente!')
        }
      )
    })
  }

  const addListHead = () => {
    promptWithToast(<h5>🪢 ¡Vamos a crear una nueva lista! ¿Cómo la llamaremos?</h5>, val => {
      const newTail: never[] = []
      if (!tails[val.toLowerCase()]) {
        setTails({ ...tails, [val.toLowerCase()]: newTail })
        return toast.success('🎉 ¡Lista creada exitosamente!')
      }

      const newTails = { ...tails }
      const prevNodes = newTails[val.toLowerCase()]
      delete newTails[val.toLowerCase()]

      promptWithToast(
        <div>
          <h5>⚠️ El nombre de la lista ya existe. ¿Deseas cambiarlo?</h5>
          <p>📝 Escribe su nuevo nombre:</p>
        </div>,
        val => {
          newTails[val.toLowerCase()] = prevNodes
          setTails(newTails)
          return toast.success('✅ ¡Lista renombrada correctamente!')
        }
      )
    })
  }

  const updateHead = () => {
    if (view === 'tree') return updateTreeHead()
    updateListHead()
  }

  const updateTreeHead = () => {
    promptWithNodesToast(<h5>🌲 Elige el árbol que quieres actualizar</h5>, ({ val, select }) => {
      const newTrees = { ...trees }
      const prevTreeNodes = newTrees[select]
      delete newTrees[select]

      newTrees[val] = prevTreeNodes
      setTrees(newTrees)

      return toast.success('🌟 ¡Árbol actualizado exitosamente!')
    })
  }

  const updateListHead = () => {
    promptWithNodesToast(<h5>🪢 Selecciona la lista que deseas actualizar</h5>, ({ val, select }) => {
      const newTails = { ...tails }
      const prevTailsNodes = newTails[select]
      delete newTails[select]

      newTails[val] = prevTailsNodes
      setTails(newTails)

      return toast.success('🌟 ¡Lista actualizada exitosamente!')
    })
  }

  const removeHead = () => {
    if (view === 'tree') return removeTreeHead()
    removeListHead()
  }

  const removeTreeHead = () => {
    promptOnlyNodesToast(<h5>✂️ ¿Qué árbol talaremos hoy?</h5>, select => {
      const newTrees = { ...trees }
      delete newTrees[select]
      setTrees(newTrees)
      return toast.success('❌ ¡Árbol eliminado exitosamente!')
    })
  }

  const removeListHead = () => {
    promptOnlyNodesToast(<h5>🗑️ ¿Qué lista borraremos hoy?</h5>, select => {
      const newTails = { ...tails }
      delete newTails[select]
      setTails(newTails)
      return toast.success('❌ ¡Lista eliminada exitosamente!')
    })
  }

  return {
    headName,
    setHeadName,
    addHead,
    removeHead,
    validateName,
    updateHead
  }
}

export default useMutablePracticeActions
