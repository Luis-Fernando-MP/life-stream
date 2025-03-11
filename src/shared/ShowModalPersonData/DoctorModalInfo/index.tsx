import { DoctorWithPerson } from '@/app/api/allData/route'
import { ROL, ROLES_DOCTOR_ACCESS } from '@/shared/roles'
import { fromDate } from '@/shared/time'
import { useUser } from '@clerk/nextjs'
import { SaveIcon, Trash2Icon } from 'lucide-react'
import type { JSX } from 'react'

import './style.scss'

interface IDoctorModalInfo {
  doctorData: any
}

const DoctorModalInfo = ({ doctorData }: IDoctorModalInfo): JSX.Element => {
  const { user } = useUser()
  const userRol = user?.organizationMemberships[0]?.role
  const { person, DNI } = doctorData as DoctorWithPerson
  const { photo, firstName, email, lastName, createdAt, updatedAt, username } = person

  const haveRole = Object.values(ROLES_DOCTOR_ACCESS).includes(userRol as ROL)

  return (
    <article className='doctorModalInfo'>
      <header className='doctorModalInfo-header'>
        <div className='doctorModalInfo-user'>
          <img src={photo ?? ''} alt={firstName} />
          <div className='doctorModalInfo-user__name'>
            <h2>{firstName}</h2>
            <p>{email}</p>
          </div>
        </div>
        {haveRole && (
          <div className='doctorModalInfo-actions'>
            <button className='doctorModalInfo-action'>
              <Trash2Icon />
              <p>Eliminar Doctor</p>
            </button>
            <button className='doctorModalInfo-action'>
              <SaveIcon />
              <p>Actualizar Doctor</p>
            </button>
          </div>
        )}
      </header>

      <section className='doctorModalInfo-content'>
        <h4>Información del doctor</h4>

        <form className='doctorModalInfo-form'>
          <div className='doctorModalInfo-field'>
            <h5>Doctor:</h5>
            <input type='text' autoComplete='off' placeholder='nombres' defaultValue={firstName} />
            <input type='text' autoComplete='off' placeholder='apellidos' defaultValue={lastName} />
          </div>
          <div className='doctorModalInfo-field'>
            <h5>Correo:</h5>
            <input type='text' autoComplete='off' placeholder='correo' defaultValue={email} />
          </div>
          <div className='doctorModalInfo-field'>
            <h5>Usuario:</h5>
            <input type='text' autoComplete='off' placeholder='usuario' defaultValue={username} />
          </div>
          <div className='doctorModalInfo-field'>
            <h5>DNI:</h5>
            <input type='text' autoComplete='off' placeholder='01xxxxxx' defaultValue={DNI} />
          </div>
        </form>
      </section>
      <footer className='doctorModalInfo-footer'>
        <p>Creado: {fromDate(String(createdAt))}</p>
        <p>Actualizado: {fromDate(String(updatedAt))}</p>
      </footer>
    </article>
  )
}

export default DoctorModalInfo
