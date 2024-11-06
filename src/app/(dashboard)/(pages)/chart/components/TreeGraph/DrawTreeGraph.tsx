import RedBlackTree, { TreeNode } from '@/shared/tree/RedBlackTree'
import { type JSX, memo } from 'react'

import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import useTreeGraph from '../../hooks/useTreeGraph'
import './style.scss'

interface IDrawTreeGraph {
  trees: {
    [key: string]: RedBlackTree
  }
}

const DrawTreeGraph = ({ trees }: IDrawTreeGraph): JSX.Element => {
  const setPerson = useSelectPerson(s => s.setPerson)
  const { svgRef } = useTreeGraph({
    trees,
    onNodeClick(data) {
      const dataNode = data.data.node as any as TreeNode
      setPerson({
        type: dataNode?.data?.type as ESelectPerson,
        ...dataNode.data
      })
    }
  })

  return <svg ref={svgRef} className='treeGraph-svg delay animate-blurred-fade-in'></svg>
}

export default memo(DrawTreeGraph)
