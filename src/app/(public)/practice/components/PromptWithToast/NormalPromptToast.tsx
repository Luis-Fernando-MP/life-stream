'use client'

import { validateName } from '@/shared/validateName'
import { CheckIcon, XIcon } from 'lucide-react'
import { type JSX, ReactNode, useRef } from 'react'
import toast from 'react-hot-toast'

import './style.scss'

interface IPromptWithToast {
  children: ReactNode
  toastId: string
  onConfirm: (value: string) => void
}

export const NormalPromptToast = ({ children, onConfirm, toastId }: IPromptWithToast): JSX.Element => {
  const simpleToastId = 'NormalPromptToastValidate'

  const $modalInput = useRef<HTMLInputElement>(null)

  const handleConfirm = (value: string) => {
    const isValidName = validateName(value)
    if (!isValidName) return toast.error('verifica el nombre', { id: simpleToastId, duration: 500 })
    toast.dismiss(toastId)
    onConfirm(value.trim())
  }

  return (
    <div className='promptToast'>
      {children}
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
