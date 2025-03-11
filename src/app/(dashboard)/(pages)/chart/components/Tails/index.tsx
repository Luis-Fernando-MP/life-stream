import { useAllData } from '@/db/hooks/useAllData'
import type { JSX } from 'react'

import { ESelectPerson } from '../../hooks/useSelectPerson'
import Tail from '../Tail'
import TailDoctor from '../TailDoctor'
import './style.scss'

const Tails = (): JSX.Element => {
  const { error, data, isLoading } = useAllData()
  if (error) return <h2>Error al cargar toda la información</h2>
  if (isLoading) return <h2>Cargando componentes</h2>
  return (
    <section className='tails delay animate-blurred-fade-in'>
      <h2>Lista de miembros</h2>

      <article className='tails-box'>
        <h5>{data?.doctors.length} Doctores</h5>
        <ul className='tails-box__list tails-doctors'>
          {data?.doctors.map(d => {
            const dataTail = {
              type: ESelectPerson.DOC,
              image: d.person.photo ?? '',
              id: d.DNI,
              dbId: d.id,
              name: d.person.firstName ?? d.person.lastName,
              etc: d,
              createdAt: d.person.createdAt?.toString() ?? ''
            }
            return <TailDoctor key={d.id} {...dataTail} />
          })}
        </ul>
      </article>

      <article className='tails-box'>
        <h5>{data?.doctors.length} Donantes</h5>
        <ul className='tails-box__list'>
          {data?.bloodDonors.map(d => {
            const dataTail = {
              type: ESelectPerson.DON,
              image: d.patient.person.photo ?? '',
              id: d.patient.DNI,
              dbId: d.id,
              name: d.patient.person.firstName ?? d.patient.person.lastName,
              etc: d,
              createdAt: d.patient.person.createdAt?.toString() ?? ''
            }
            return <Tail key={d.id} {...dataTail} />
          })}
        </ul>
      </article>

      <article className='tails-box'>
        <h5>{data?.doctors.length} Receptores</h5>
        <ul className='tails-box__list'>
          {data?.bloodReceivers.map(br => {
            const dataTail = {
              type: ESelectPerson.REC,
              image: br.patient.person.photo ?? '',
              id: br.patient.DNI,
              name: br.patient.person.firstName ?? br.patient.person.lastName,
              etc: br,
              dbId: br.id,
              createdAt: br.patient.person.createdAt?.toString() ?? ''
            }
            return <Tail key={br.id} {...dataTail} />
          })}
        </ul>
      </article>

      <article className='tails-box'>
        <h5>{data?.patients.length} Pacientes</h5>
        <ul className='tails-box__list'>
          {data?.patients.map(p => {
            const dataTail = {
              type: ESelectPerson.PAT,
              image: p.person.photo ?? '',
              id: p.DNI,
              name: p.person.firstName ?? p.person.lastName,
              etc: p,
              dbId: p.id,
              createdAt: p.person.createdAt?.toString() ?? ''
            }
            return <Tail key={p.id} {...dataTail} />
          })}
        </ul>
      </article>
    </section>
  )
}

export default Tails
