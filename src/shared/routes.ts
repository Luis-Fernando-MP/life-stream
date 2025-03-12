import {
  ChartLineIcon,
  DnaIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HouseIcon,
  LogInIcon,
  MedalIcon,
  PlusIcon,
  UserPlusIcon
} from 'lucide-react'

import { USER_ROLES } from './roles'

export const USER_ROUTES = {
  home: {
    path: '/',
    subPaths: '/',
    title: 'Inicio',
    description: '🏠 Página de inicio',
    Icon: HouseIcon,
    requiredRoles: []
  },
  chart: {
    path: '/chart',
    subPaths: '/chart',
    title: 'Gráficos',
    description: 'Analizar registros',
    Icon: ChartLineIcon,
    requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.DOCTOR_ADMIN, USER_ROLES.USER]
  },

  donors: {
    path: '/donors',
    subPaths: '/donors/[donorID]',
    title: 'Donantes',
    description: '❤️ Lista de donantes de sangre',
    Icon: HeartHandshakeIcon,
    requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.DOCTOR_ADMIN, USER_ROLES.USER]
  },
  registerDonor: {
    path: '/donors/register',
    subPaths: '/donors/register',
    title: 'Registrar Donante',
    description: '📝 Registro de nuevo donante de sangre',
    Icon: HeartIcon,
    requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.DOCTOR_ADMIN]
  },
  recipients: {
    path: '/recipients',
    subPaths: '/recipients/[donorID]',
    title: 'Receptores',
    description: '🧑‍🤝‍🧑 Lista de receptores',
    Icon: DnaIcon,
    requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.DOCTOR_ADMIN, USER_ROLES.USER]
  },
  registerRecipient: {
    path: '/recipients/register',
    subPaths: '/recipients/register',
    title: 'Registrar Receptor',
    description: '📝 Registro de nuevo receptor',
    Icon: PlusIcon,
    requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.DOCTOR_ADMIN]
  },

  'want-donate': {
    path: '/want-donate',
    subPaths: '/want-donate/',
    title: 'Donar Sangre',
    description: '🩸 Estoy dispuesto a donar sangre y ayudar a salvar vidas',
    Icon: HeartIcon,
    requiredRoles: [USER_ROLES.USER]
  }
}
export const ROUTES = {
  ...USER_ROUTES,
  authors: {
    path: '/authors',
    subPaths: '/authors',
    title: 'Autores',
    description: '✍️ Conoce a los autores',
    Icon: MedalIcon,
    requiredRoles: []
  },
  login: {
    path: '/sign-in',
    subPaths: '/sign-in/[etc]',
    title: 'Iniciar Sesión',
    description: '🔑 Accede a tu cuenta',
    Icon: LogInIcon,
    requiredRoles: []
  },
  registerAccount: {
    path: '/sign-up',
    subPaths: '/sign-up/[etc]',
    title: 'Registrar Cuenta',
    description: '🆕 Crear una nueva cuenta',
    Icon: UserPlusIcon,
    requiredRoles: []
  }
}

interface IMatchRoute {
  path: string
  route: string
}

export const matchRoute = ({ path, route }: IMatchRoute) => {
  const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '\\d+')}$`)
  return route === path || regex.test(route)
}

export const PUBLIC_ROUTES = [ROUTES.home.path, ROUTES.login.path, ROUTES.registerAccount.path]
