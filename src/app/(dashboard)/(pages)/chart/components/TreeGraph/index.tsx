import { type JSX, memo } from 'react'

import useStoreTrees from '../../../hooks/useStoreTrees'
import DrawTreeGraph from './DrawTreeGraph'
import './style.scss'

const TreeGraph = (): JSX.Element => {
  const { status, data } = useStoreTrees()
  const trees = data.trees

  if (status === 'pending') return <p>Cargando...</p>
  return <DrawTreeGraph trees={trees} />
}

export default memo(TreeGraph)
