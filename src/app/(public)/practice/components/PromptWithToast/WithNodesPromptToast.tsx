'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import { acl } from '@/shared/activeClass'
import { validateName } from '@/shared/validateName'
import { CheckIcon, XIcon } from 'lucide-react'
import { type JSX, ReactNode, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

export interface IPromptWithNodesToast {
  children: ReactNode
  toastId: string
  onConfirm: (data: { val: string; select: string }) => void
}

export const WithNodesPromptToast = ({
  children,
  onConfirm,
  toastId
}: IPromptWithNodesToast): JSX.Element => {
  const { trees, tails } = usePracticeStoreTrees()
  const view = useChartView(s => s.view)
  const paragraphView = useMemo(() => (view === 'tree' ? 'Árbol' : 'Lista'), [view])
  const [selectTree, setSelectTree] = useState('')
  const $modalInput = useRef<HTMLInputElement>(null)

  const listNodes = useMemo(
    () => (view === 'tree' ? Object.keys(trees) : Object.keys(tails)),
    [view, trees, tails]
  )

  const handleConfirm = useCallback(
    (value: string) => {
      const simpleToastId = 'WithNodesPromptToastValidate'
      const isValidName = validateName(value)
      if (!selectTree) {
        return toast.error(`¿Has escogido un ${paragraphView}?`, {
          id: simpleToastId,
          duration: 500
        })
      }
      if (!isValidName || !selectTree) {
        return toast.error('Verifica que el nombre sea correcto', {
          id: simpleToastId,
          duration: 500
        })
      }

      toast.dismiss(toastId)
      setTimeout(() => onConfirm({ val: value.trim(), select: selectTree }), 1000)
    },
    [selectTree, paragraphView, onConfirm, toastId]
  )

  const PromptNode = useCallback(
    ({ name }: { name: string }) => (
      <button
        className={`promptToast-nodes__btn ${acl(selectTree === name)}`}
        onClick={() => setSelectTree(name)}
      >
        {name}
      </button>
    ),
    [selectTree]
  )

  console.log('render')

  return (
    <div className='promptToast'>
      {children}
      <section className='promptToast-nodes'>
        {listNodes.map(k => (
          <PromptNode key={k} name={k} />
        ))}
      </section>
      <h5>Nuevo nombre</h5>
      <input
        ref={$modalInput}
        autoFocus
        placeholder='example...'
        className='promptToast-field'
        onKeyDown={e => {
          if (e.key !== 'Enter') return
          const { value } = e.target as HTMLInputElement
          handleConfirm(value)
        }}
      />

      <div className='promptToast-options'>
        <button
          className='promptToast-btn'
          onClick={() => {
            const field = $modalInput.current
            if (!field) return
            handleConfirm(field.value)
          }}
        >
          <CheckIcon />
        </button>
        <button onClick={() => toast.dismiss(toastId)} className='promptToast-btn'>
          <XIcon />
        </button>
      </div>
    </div>
  )
}

export default memo(WithNodesPromptToast)
