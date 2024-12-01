'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import RedBlackTree from '@/shared/tree/RedBlackTree'
import { validateName } from '@/shared/validateName'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { promptWithNodesToast, promptWithToast } from '../components/PromptWithToast'
import usePracticeStoreTrees from './usePracticeStoreTrees'

const useMutablePracticeActions = (viewx: string) => {
  const view = useChartView(s => s.view)
  const paragraphView = view === 'tree' ? 'Árbol' : 'Lista'

  const { trees, setTrees, tails, setTails } = usePracticeStoreTrees()
  const [headName, setHeadName] = useState('')

  const addHead = () => {
    // if (!headName || !validateName(headName)) {
    //   return toast.error('Nombre inválido. Usa solo letras, números, guiones "-" o "_"')
    // }
    const newTree = new RedBlackTree()

    promptWithToast(`¿Cual sera el nombre del nuevo ${paragraphView}?`, val => {
      if (!trees[val.toLowerCase()]) {
        setTrees({ ...trees, [val.toLowerCase()]: newTree })
        return toast.success('Árbol agregado correctamente')
      }
      const newTrees = { ...trees }
      const prevTreeNodes = newTrees[val.toLocaleLowerCase()]
      delete newTrees[val.toLocaleLowerCase()]

      promptWithToast(
        <div>
          <h5>✏️ El nombre del árbol ya existe, ¿Deseas modificarlo?</h5>
          <p>Agrega su nuevo nombre</p>
        </div>,
        val => {
          newTrees[val.toLowerCase()] = prevTreeNodes
          console.log(val, newTrees)
          setTrees(newTrees)

          return toast.success('Árbol modificado correctamente')
          // newTrees[val.toLowerCase()] = newTree
          // // delete
        }
      )
    })
  }

  const updateHead = () => {
    const newTree = new RedBlackTree()

    promptWithNodesToast(<h5>Escojamos una opción para actualizar</h5>, ({ val, select }) => {
      const newTrees = { ...trees }
      const prevTreeNodes = newTrees[select]
      delete newTrees[select]

      newTrees[val] = prevTreeNodes
      setTrees(newTrees)

      return toast.success('Árbol modificado correctamente')
    })
  }

  const removeHead = () => {
    if (!headName || !validateName(headName)) {
      return toast.error('Nombre inválido.')
    }

    if (view === 'tree') {
      if (!trees[headName.toLowerCase()]) {
        return toast.error('El árbol no existe.')
      }
      setTrees(prev => {
        const updated = { ...prev }
        delete updated[headName.toLowerCase()]
        return updated
      })
      toast.success('Árbol eliminado correctamente')
    } else {
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
