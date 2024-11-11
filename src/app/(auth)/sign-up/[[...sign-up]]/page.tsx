import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <h1 className='auth-title'>
        Iniciar
        <br />
        Cuenta
      </h1>
      <span>Nueva</span>
      <p className='auth-message'>
        Hay que registrarnos y comenzar
        <br /> con nuestro deber 👩‍🏭
      </p>
      <div className='delay animate-blurred-fade-in'>
        <SignUp />
      </div>
    </>
  )
}
