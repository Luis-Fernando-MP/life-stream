import DrawTreeGraph from '@pages/chart/components/TreeGraph/DrawTreeGraph'
import useStoreTrees from '@pages/hooks/useStoreTrees'
import { type JSX, memo } from 'react'

import './style.scss'

const TreeGraph = (): JSX.Element => {
  const { status, data } = useStoreTrees()
  const trees = data.trees

  if (status === 'pending') return <p>Cargando...</p>
  return <DrawTreeGraph className='delay animate-blurred-fade-in' trees={trees} />
}

export default memo(TreeGraph)
