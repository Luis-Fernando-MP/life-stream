import { DnaIcon, Stethoscope } from 'lucide-react'
import type { JSX } from 'react'

import './style.scss'
import './userMobile.scss'

const Page = (): JSX.Element => {
  return (
    <article className='layout-container home'>
      <div className='home-left animate-blurred-fade-in'>
        <section className='home-brand'>
          <h5>Life Stream</h5>
          <p>
            Medicina y tecnología
            <br /> al servicio de la vida
          </p>
        </section>

        <h1 className='home-title'>
          Es Hora de <b>DONAR</b>
          <br /> Compartamos una segunda <br />
          <b className='tn1'>oportunidad de vida</b>
        </h1>

        <p className='home-description'>
          Únete a nuestra misión de <b>salvar vidas.</b>
          <br /> Con cada donación de sangre, brindamos <b className='tn1'>esperanza y salud</b>
          <br /> a quienes más lo necesitan en el hospital Life Stream
        </p>

        <section className='home-more'>
          <div className='home-more__card'>
            <div className='home-more__svg'>
              <Stethoscope />
            </div>
            <h3>Chequeo Médico Integral</h3>
            <p>
              (V) Nuestro equipo médico realiza una evaluación integral, asegurando que <u>tú</u> y el receptor <br /> estén
              protegidos. Este chequeo garantiza una experiencia de donación <i>segura y confiable</i>.
            </p>
          </div>

          <div className='home-more__card'>
            <div className='home-more__svg'>
              <DnaIcon />
            </div>
            <h3>Seguridad y Compatibilidad Aseguradas</h3>
            <p>
              (I) Cada donación es verificada minuciosamente, garantizando <b>compatibilidad total</b> para los <br /> pacientes.
              Nos comprometemos a que cada unidad de sangre llegue de forma <u>segura</u> y sea
              <br /> compatible, salvando vidas en el momento más crucial.
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}

export default Page
