import useTreeGraph from '@pages/chart/hooks/useTreeGraph'
import { type JSX, memo, useEffect } from 'react'

import usePracticeStoreTrees from '../../hooks/usePracticeStoreTrees'
import './style.scss'

const PracticeTreeGraph = (): JSX.Element => {
  const { trees } = usePracticeStoreTrees()
  // const setPerson = useSelectPerson(s => s.setPerson)
  const { svgRef, setTrees } = useTreeGraph({
    trees,
    onNodeClick(data) {
      // const dataNode = data.data.node as any as TreeNode
      console.log(data)
    }
  })
  useEffect(() => {
    setTrees(trees)
  }, [setTrees, trees])

  return <svg ref={svgRef} className='treeGraph-svg delay animate-blurred-fade-in'></svg>
}

export default memo(PracticeTreeGraph)
