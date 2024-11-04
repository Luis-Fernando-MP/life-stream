import { useAllData } from '@/db/hooks/useAllData'
import { TreeNode } from '@/shared/tree/RedBlackTree'
import { type JSX, memo, useEffect } from 'react'

import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import useTreeGraph from '../../hooks/useTreeGraph'
import './style.scss'

const TreeGraph = (): JSX.Element => {
  const { error, data, isLoading } = useAllData()
  const setPerson = useSelectPerson(s => s.setPerson)
  const { svgRef, setTrees } = useTreeGraph({
    onNodeClick(data) {
      const dataNode = data.data.node as any as TreeNode
      setPerson({
        type: dataNode?.data?.type as ESelectPerson,
        ...dataNode.data
      })
    }
  })

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

    setTrees({
      Doctores: doctors,
      Pacientes: patients,
      Donantes: bloodDonors,
      Receptores: bloodReceivers
    })
    return () => {}
  }, [data, setTrees])

  if (error) return <h2>Error al cargar toda la información</h2>
  if (isLoading) return <h2>Cargando componentes</h2>

  return <svg ref={svgRef} className='treeGraph-svg delay animate-blurred-fade-in'></svg>
}

export default memo(TreeGraph)
