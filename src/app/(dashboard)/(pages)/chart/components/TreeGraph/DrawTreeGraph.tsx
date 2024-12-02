import RedBlackTree, { TreeNode } from '@/shared/tree/RedBlackTree'
import { type JSX, memo } from 'react'

import useSelectPerson, { ESelectPerson } from '../../hooks/useSelectPerson'
import useTreeGraph from '../../hooks/useTreeGraph'
import './style.scss'

interface IDrawTreeGraph {
  className?: string
  trees: {
    [key: string]: RedBlackTree
  }
}

const DrawTreeGraph = ({ trees, className }: IDrawTreeGraph): JSX.Element => {
  const setPerson = useSelectPerson(s => s.setPerson)
  const { svgRef } = useTreeGraph({
    trees,
    onNodeClick(data) {
      const dataNode = data.data.node as any as TreeNode
      console.log('....... tree ', data.data)

      setPerson({
        type: dataNode?.data?.type as ESelectPerson,
        ...dataNode.data
      })
    }
  })

  return <svg ref={svgRef} className={`treeGraph-svg ${className}`}></svg>
}

export default memo(DrawTreeGraph)
