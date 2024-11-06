'use client'

import { useAllData } from '@/db/hooks/useAllData'
import RedBlackTree from '@/shared/tree/RedBlackTree'
import { useEffect } from 'react'

import { ESelectPerson } from '../chart/hooks/useSelectPerson'
import useStoreTrees from './useStoreTrees'

const useTress = () => {
  const query = useAllData()
  const { data: treeQuery, setData } = useStoreTrees()

  const data = query.data

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
    console.log('building')

    setData({
      trees: {
        doctorsTree,
        patientsTree,
        bloodDonorsTree,
        bloodReceiversTree
      },
      query: data
    })
  }, [data, setData])

  return { treeQuery, query }
}

export default useTress
