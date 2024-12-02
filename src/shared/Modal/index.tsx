'use client'

import { XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import './style.scss'
import { useModal } from './useModal'

interface IModal extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  isOpen: boolean
  onClose: (close: boolean) => void
}

const Modal: React.FC<IModal> = ({ children, className = '', isOpen, onClose, ...props }) => {
  const [closing, setClosing] = useState(false)
  const { modalRef, closeModal } = useModal(isOpen, () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose(false)
    }, 200)
  })

  useEffect(() => {
    if (!isOpen) setClosing(false)
  }, [isOpen])

  if (!isOpen && !closing) return null

  const render = (
    <section ref={modalRef} className={`modal ${closing ? 'closing' : 'active'}`}>
      <button className='modal-closeButton' onClick={closeModal}>
        <XIcon />
      </button>
      <div className={`modal-container animate-fade-in-up ${className}`} {...props}>
        {children}
      </div>
    </section>
  )

  return createPortal(render, document.body)
}

export default Modal
