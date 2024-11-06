'use client'

import DrawTreeGraph from '@/app/(dashboard)/(pages)/chart/components/TreeGraph/DrawTreeGraph'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import type { JSX } from 'react'

import './style.scss'

interface IDonorsComponent {
  className?: string
}

const DonorsComponent = ({ className }: IDonorsComponent): JSX.Element => {
  const { status, data } = useStoreTrees()

  if (status === 'pending') return <p>loading donors...</p>
  if (status === 'error') return <p>error donors...</p>

  console.log(data)
  // const donors = data.trees.donantes.root.data

  return (
    <article className='dataDon-donors dataDon-container'>
      <DrawTreeGraph
        trees={{
          donantes: data.trees.donantes
        }}
      />
    </article>
  )
}

export default DonorsComponent
