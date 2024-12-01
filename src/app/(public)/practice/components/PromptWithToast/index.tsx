'use client'

import { ReactNode } from 'react'
import toast from 'react-hot-toast'

import { NormalPromptToast } from './NormalPromptToast'
import WithNodesPromptToast, { IPromptWithNodesToast } from './WithNodesPromptToast'
import './style.scss'

const promptWithToast = (message: ReactNode, onConfirm: (value: string) => void) => {
  toast.custom(
    t => {
      return (
        <NormalPromptToast onConfirm={onConfirm} toastId={t.id}>
          {message}
        </NormalPromptToast>
      )
    }
    // { duration: 2000 }
  )
}

const promptWithNodesToast = (
  message: ReactNode,
  onConfirm: IPromptWithNodesToast['onConfirm']
) => {
  toast.custom(
    t => {
      return (
        <WithNodesPromptToast toastId={t.id} onConfirm={onConfirm}>
          {message}
        </WithNodesPromptToast>
      )
    },
    { duration: 1000 }
  )
}

export { promptWithToast, promptWithNodesToast }
