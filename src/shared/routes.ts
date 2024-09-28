import Logo from '@/shared/ui/Logo'
import {
  DnaIcon,
  HeartHandshakeIcon,
  HeartIcon,
  LogInIcon,
  MedalIcon,
  PlusIcon,
  UserPlusIcon
} from 'lucide-react'

export const ROUTES = {
  home: {
    path: '/',
    subPaths: '/',
    title: 'Inicio',
    description: '🏠 Página de inicio',
    Icon: Logo
  },
  registerDonor: {
    path: '/donors/register',
    subPaths: '/donors/register',
    title: 'Registrar Donante',
    description: '📝 Registro de nuevo donante de sangre',
    Icon: PlusIcon
  },
  donors: {
    path: '/donors',
    subPaths: '/donors/[donorID]',
    title: 'Donantes',
    description: '❤️ Lista de donantes de sangre',
    Icon: DnaIcon
  },
  recipients: {
    path: '/recipients',
    subPaths: '/recipients/[donorID]',
    title: 'Receptores',
    description: '🧑‍🤝‍🧑 Lista de receptores',
    Icon: HeartIcon
  },
  registerRecipient: {
    path: '/recipients/register',
    subPaths: '/recipients/register',
    title: 'Registrar Receptor',
    description: '📝 Registro de nuevo receptor',
    Icon: HeartHandshakeIcon
  },
  authors: {
    path: '/authors',
    subPaths: '/authors',
    title: 'Autores',
    description: '✍️ Conoce a los autores',
    Icon: MedalIcon
  },
  login: {
    path: '/sign-in',
    subPaths: '/sign-in/[etc]',
    title: 'Iniciar Sesión',
    description: '🔑 Accede a tu cuenta',
    Icon: LogInIcon
  },
  registerAccount: {
    path: '/sign-up',
    subPaths: '/sign-up/[etc]',
    title: 'Registrar Cuenta',
    description: '🆕 Crear una nueva cuenta',
    Icon: UserPlusIcon
  }
}

export const firstRoutes = Object.entries(ROUTES).splice(0, 5)
export const endRoutes = Object.entries(ROUTES).splice(6, -1)

interface IMatchRoute {
  path: string
  route: string
}

export const matchRoute = ({ path, route }: IMatchRoute) => {
  const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '\\d+')}$`)
  return route === path || regex.test(route)
}
