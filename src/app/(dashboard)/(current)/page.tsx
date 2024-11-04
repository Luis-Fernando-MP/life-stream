'use client'

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
          <br /> Compartamos una segunda <b className='tn1'>oportunidad de vida</b>
        </h1>

        <p className='home-description'>
          Únete a nuestra misión de <b>salvar vidas.</b>
          <br /> Con cada donación de sangre, brindamos <b className='tn1'>esperanza y salud</b>
          <br /> a quienes más lo necesitan en el hospital Life Stream
        </p>

        <section className='home-more'>
          <div className='home-more__card left'>
            <div className='home-more__svg'>
              <Stethoscope />
            </div>
            <h3>Chequeo Médico Integral</h3>
            <p>
              (V) Nuestro equipo médico realiza una evaluación integral, asegurando que <u>tú</u> y
              el receptor estén protegidos. Este chequeo garantiza una experiencia de donación{' '}
              <i>segura y confiable</i>.
            </p>
          </div>

          <div className='home-more__card right'>
            <div className='home-more__svg'>
              <DnaIcon />
            </div>
            <h3>Seguridad y Compatibilidad Aseguradas</h3>
            <p>
              (I) Cada donación es verificada minuciosamente, <br /> garantizando&nbps;
              <i>compatibilidad total</i> <br />
              para los pacientes. Nos comprometemos a que
              <br />
              cada unidad de sangre llegue de forma <u>segura</u>
              <br />y sea compatible, salvando vidas <br />
              en el momento más crucial.
            </p>
          </div>
        </section>
      </div>
      <div className='home-right delay animate-blurred-fade-in'>
        <video src='/adn.mp4' muted autoPlay loop className='home-right__background'></video>

        <div className='home-process'>
          <video src='/spirit.mp4' muted autoPlay loop />
          <section className='home-process__info'>
            <h3>Asistencia Médica Personalizada</h3>
            <p>Contamos con personal especializado para guiarte en todo el proceso de donación.</p>
          </section>
        </div>

        <section className='home-benefits'>
          <h3>Beneficios de Donar Sangre 💚</h3>
          <ul className='home-benefits__list'>
            <li className='home-benefits__item'>Transforma vidas</li>
            <li className='home-benefits__item'>
              Provee una <b>segunda oportunidad</b>
            </li>
            <li className='home-benefits__item'>
              <b>Acto de amor y empatía</b>
            </li>
            <li className='home-benefits__item'>
              Proceso <b>seguro, rápido y confiable</b>
            </li>
            <li className='home-benefits__item'>
              Cada donación, una <b>esperanza</b>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}

export default Page
