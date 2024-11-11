import { TreeNode } from '@/shared/tree/RedBlackTree'
import { type JSX, memo, useEffect } from 'react'

import useStoreTrees from '../../../hooks/useStoreTrees'
import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import useTreeGraph from '../../hooks/useTreeGraph'
import './style.scss'

const TreeGraph = (): JSX.Element => {
  const { status, data } = useStoreTrees()

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

  const trees = data.trees

  useEffect(() => {
    if (status === 'pending') return
    setTrees(trees)
    return () => {}
  }, [setTrees, status, trees])

  if (status === 'pending') return <p>Cargando...</p>
  return <svg ref={svgRef} className='treeGraph-svg delay animate-blurred-fade-in'></svg>
}

export default memo(TreeGraph)
