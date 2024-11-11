import { useAllData } from '@/db/hooks/useAllData'
import { ESelectPerson } from '@pages/chart/hooks/useSelectPerson'
import type { JSX } from 'react'

import Tail from '../Tail'
import './style.scss'

const Tails = (): JSX.Element => {
  const { error, data, isLoading } = useAllData()
  if (error) return <h2>Error al cargar toda la información</h2>
  if (isLoading) return <h2>Cargando componentes</h2>
  return (
    <section className='tails delay animate-blurred-fade-in'>
      <h2>Vista Por arrayList</h2>

      <article className='tails-box'>
        <h5>{data?.doctors.length} Doctores</h5>
        <ul className='tails-box__list'>
          {data?.doctors.map(d => {
            const dataTail = {
              type: ESelectPerson.DOC,
              image: d.person.photo ?? '',
              id: d.DNI,
              name: d.person.firstName ?? d.person.lastName,
              etc: d,
              createdAt: d.person.createdAt?.toString() ?? ''
            }
            return <Tail key={d.id} {...dataTail} />
          })}
        </ul>
      </article>
    </section>
  )
}

export default Tails
