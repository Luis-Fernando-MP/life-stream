import { type JSX } from 'react'

import useTreeGraph from '../../hooks/useTreeGraph'

interface ITreeGraph {
  mainNode: NodeData
}

const TreeGraph = ({ mainNode }: ITreeGraph): JSX.Element => {
  const { svgRef } = useTreeGraph({
    onNodeClick(_, data) {
      console.log(data)
    },
    trees: {
      tree1: [
        { id: 4, image: '/1.jpg' },
        { id: 5, image: '/1.jpg' },
        { id: 2 },
        { id: 1, image: '/1.jpg' }
      ]
    }
  })

  return (
    <div className='overflow-x-auto'>
      <svg ref={svgRef} className='svg'></svg>
    </div>
  )
}

export default TreeGraph
