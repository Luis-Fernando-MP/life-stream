'use client'

import useSelectPerson, { type ISelectPersonTreeNode } from '@/app/(dashboard)/(pages)/chart/hooks/useSelectPerson'
import { type JSX, memo, useEffect, useState } from 'react'

import Modal from '../Modal'
import DoctorModalInfo from './DoctorModalInfo'
import AnyModalInfo from './temporal'

const ShowModalPersonData = () => {
  const person = useSelectPerson(s => s.person)
  if (!person) return null
  return <ShowModal person={person} />
}

const ShowModal = ({ person }: { person: ISelectPersonTreeNode }) => {
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!document) return
    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement
      const modalElement = element.closest('[data-modal]')
      if (!modalElement) return
      setModal(true)
    }

    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  const { type } = person

  return (
    <Modal isOpen={modal} onClose={setModal}>
      {type === 'Doctor' && <DoctorModalInfo doctorData={person} />}
      {/* {type === 'Patient' && <AnyModalInfo data={person} type='Paciente' />}
      {type === 'bloodReceiver' && <AnyModalInfo data={person.patient} type='Receptor' />}
      {type === 'BloodDonor' && <AnyModalInfo data={person.patient} type='Donante' />} */}
    </Modal>
  )
}

export default memo(ShowModalPersonData)
