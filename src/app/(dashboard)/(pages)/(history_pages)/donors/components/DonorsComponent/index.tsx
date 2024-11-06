'use client'

import DrawTreeGraph from '@/app/(dashboard)/(pages)/chart/components/TreeGraph/DrawTreeGraph'
import useChartView from '@/app/(dashboard)/(pages)/chart/hooks/useChartView'
import useStoreTrees from '@/app/(dashboard)/(pages)/hooks/useStoreTrees'
import { NetworkIcon, Rows4Icon } from 'lucide-react'
import type { JSX } from 'react'

import TailsDonorComponent from '../TailsDonorComponent'
import './style.scss'

interface IDonorsComponent {
  className?: string
}

const DonorsComponent = ({ className }: IDonorsComponent): JSX.Element => {
  const { status, data } = useStoreTrees()
  const view = useChartView(s => s.view)

  if (status === 'pending') return <p>loading donors...</p>
  if (status === 'error') return <p>error donors...</p>

  return (
    <article className={`${className} DonorsComponent`}>
      {view === 'tails' && (
        <h5 className='DonorsComponent-subTitle'>
          <Rows4Icon /> Tradicional con colas
        </h5>
      )}
      {view === 'tree' && (
        <h5 className='DonorsComponent-subTitle'>
          <NetworkIcon /> Arboles binarios Rojo-Negro
        </h5>
      )}
      {view === 'tree' && (
        <DrawTreeGraph
          className='animate-blurred-fade-in'
          trees={{
            donantes: data.trees.donantes
          }}
        />
      )}
      {view === 'tails' && <TailsDonorComponent donors={data.query?.bloodDonors ?? []} />}
    </article>
  )
}

export default DonorsComponent
