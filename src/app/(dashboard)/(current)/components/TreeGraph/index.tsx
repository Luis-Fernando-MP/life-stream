import { TreeColor } from '@/shared/tree/RedBlackTree'
import { hierarchy, select, tree, zoom } from 'd3'
import { type JSX, useEffect, useRef } from 'react'

import useTreeGraph from '../../hooks/useTreeGraph'

export interface NodeData {
  id: string | number
  color: TreeColor | string
  image?: string
  children?: NodeData[]
}

interface ITreeGraph {
  mainNode: NodeData
}

const TreeGraph = ({ mainNode }: ITreeGraph): JSX.Element => {
  const { svgRef } = useTreeGraph()

  return (
    <div className='overflow-x-auto'>
      <svg ref={svgRef} className='svg'></svg>
    </div>
  )
}

export default TreeGraph
