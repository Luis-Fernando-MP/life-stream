'use client'

import { useAllData } from '@/db/hooks/useAllData'
import RedBlackTree from '@/shared/tree/RedBlackTree'
import { type ReactNode, useEffect } from 'react'

import { ESelectPerson } from './chart/hooks/useSelectPerson'
import useStoreTrees from './hooks/useStoreTrees'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout) => {
  const { data, status } = useAllData()
  const setData = useStoreTrees(s => s.setData)
  const setStatus = useStoreTrees(s => s.setStatus)

  useEffect(() => {
    if (!data) return

    const doctors = data?.doctors?.map((d: any) => ({
      ...d,
      type: ESelectPerson.DOC,
      id: d.DNI,
      image: d.person.photo
    }))

    const patients = data?.patients?.map((p: any) => ({
      ...p,
      type: ESelectPerson.PAT,
      id: p.DNI,
      image: p.person.photo
    }))

    const bloodDonors = data?.bloodDonors?.map((bd: any) => ({
      ...bd,
      type: ESelectPerson.DON,
      id: bd.patient.DNI,
      image: bd.patient.person.photo
    }))

    const bloodReceivers = data?.bloodReceivers?.map((br: any) => ({
      ...br,
      type: ESelectPerson.REC,
      id: br.patient.DNI,
      image: br.patient.person.photo
    }))

    const doctorsTree = RedBlackTree.fromArray(doctors)
    const patientsTree = RedBlackTree.fromArray(patients)
    const bloodDonorsTree = RedBlackTree.fromArray(bloodDonors)
    const bloodReceiversTree = RedBlackTree.fromArray(bloodReceivers)

    setData({
      trees: {
        doctores: doctorsTree,
        pacientes: patientsTree,
        donantes: bloodDonorsTree,
        receptores: bloodReceiversTree
      },
      query: data
    })
  }, [data, setData])

  useEffect(() => {
    setStatus(status)
  }, [setStatus, status])

  return <>{children}</>
}

export default Layout
