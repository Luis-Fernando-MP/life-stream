import useTreeGraph, { INodeResponse } from '@pages/chart/hooks/useTreeGraph'
import { type JSX, memo, useEffect } from 'react'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const PracticeTreeGraph = (): JSX.Element => {
  const trees = usePracticeStoreTrees(s => s.trees)
  const { svgRef, setTrees } = useTreeGraph({ trees, onNodeClick })

  useEffect(() => {
    setTrees(trees)
  }, [setTrees, trees])

  function onNodeClick(data: INodeResponse) {
    console.log('click', data)
  }

  return <svg ref={svgRef} className='treeGraph-svg delay animate-blurred-fade-in'></svg>
}

export default memo(PracticeTreeGraph)
