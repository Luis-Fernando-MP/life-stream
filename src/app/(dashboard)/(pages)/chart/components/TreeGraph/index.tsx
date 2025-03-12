import { type JSX, memo } from 'react'

import useStoreTrees from '../../../hooks/useStoreTrees'
import DrawTreeGraph from './DrawTreeGraph'
import './style.scss'

const TreeGraph = (): JSX.Element => {
  const { status, data } = useStoreTrees()
  if (status === 'pending') return <p>Cargando...</p>

  const trees = data.trees
  return <DrawTreeGraph className='delay animate-blurred-fade-in' trees={trees} />
}

export default memo(TreeGraph)
