'use client'

import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import { acl } from '@/shared/activeClass'
import { CheckIcon, XIcon } from 'lucide-react'
import { type JSX, ReactNode, memo, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

export interface IPromptWithNodesToast {
  children: ReactNode
  toastId: string
  onConfirm: (select: string) => void
}

export const OnlyNodesPromptToast = ({
  children,
  onConfirm,
  toastId
}: IPromptWithNodesToast): JSX.Element => {
  const { trees, tails } = usePracticeStoreTrees()
  const view = useChartView(s => s.view)
  const paragraphView = useMemo(() => (view === 'tree' ? 'Árbol' : 'Lista'), [view])
  const [selectTree, setSelectTree] = useState('')

  const listNodes = useMemo(
    () => (view === 'tree' ? Object.keys(trees) : Object.keys(tails)),
    [view, trees, tails]
  )

  const handleConfirm = useCallback(() => {
    const simpleToastId = 'WithNodesPromptToastValidate'
    if (!selectTree) {
      return toast.error(`¿Has escogido un ${paragraphView}?`, {
        id: simpleToastId,
        duration: 500
      })
    }
    toast.dismiss(toastId)
    setTimeout(() => onConfirm(selectTree), 1000)
  }, [selectTree, paragraphView, onConfirm, toastId])

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

  return (
    <div className='promptToast'>
      {children}
      <section className='promptToast-nodes'>
        {listNodes.map(k => (
          <PromptNode key={k} name={k} />
        ))}
      </section>
      <div className='promptToast-options'>
        <button className='promptToast-btn' onClick={handleConfirm}>
          <CheckIcon />
        </button>
        <button onClick={() => toast.dismiss(toastId)} className='promptToast-btn'>
          <XIcon />
        </button>
      </div>
    </div>
  )
}

export default memo(OnlyNodesPromptToast)
