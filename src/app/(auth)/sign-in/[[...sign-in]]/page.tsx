import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <h1 className='auth-title'>
        Iniciar
        <br />
        Sesión
      </h1>
      <p className='auth-message'>
        Bienvenido de nuevo 👋, ingresemos y<br /> trabajemos duro
      </p>
      <div className='delay animate-blurred-fade-in'>
        <SignIn />
      </div>
    </>
  )
}
