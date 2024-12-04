import {
  ChartLineIcon,
  DnaIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HouseIcon,
  LogInIcon,
  MedalIcon,
  PlusIcon,
  UserPlusIcon,
  Wallpaper
} from 'lucide-react'

import { ROL } from './roles'

export const ROUTES = {
  home: {
    path: '/',
    subPaths: '/',
    title: 'Inicio',
    description: '🏠 Página de inicio',
    Icon: HouseIcon,
    requiredRoles: []
  },
  practice: {
    path: '/practice',
    subPaths: '/practice',
    title: 'Listar los Doctores',
    description: '👨‍🎓 Practica los arboles binarios',
    Icon: Wallpaper,
    requiredRoles: []
  },
  chart: {
    path: '/chart',
    subPaths: '/chart',
    title: 'Gráficos',
    description: 'Analizar registros',
    Icon: ChartLineIcon,
    requiredRoles: [ROL.ADMIN, ROL.DOCTOR, ROL.DOCTOR_ADMIN]
  },

  donors: {
    path: '/donors',
    subPaths: '/donors/[donorID]',
    title: 'Donantes',
    description: '❤️ Lista de donantes de sangre',
    Icon: HeartHandshakeIcon,
    requiredRoles: []
  },
  registerDonor: {
    path: '/donors/register',
    subPaths: '/donors/register',
    title: 'Registrar Donante',
    description: '📝 Registro de nuevo donante de sangre',
    Icon: HeartIcon,
    requiredRoles: [ROL.ADMIN, ROL.DOCTOR, ROL.DOCTOR_ADMIN]
  },
  recipients: {
    path: '/recipients',
    subPaths: '/recipients/[donorID]',
    title: 'Receptores',
    description: '🧑‍🤝‍🧑 Lista de receptores',
    Icon: DnaIcon,
    requiredRoles: []
  },
  registerRecipient: {
    path: '/recipients/register',
    subPaths: '/recipients/register',
    title: 'Registrar Receptor',
    description: '📝 Registro de nuevo receptor',
    Icon: PlusIcon,
    requiredRoles: [ROL.ADMIN, ROL.DOCTOR, ROL.DOCTOR_ADMIN]
  },

  wantDonate: {
    path: '/want-donate/',
    subPaths: '/want-donate/',
    title: 'Donar Sangre',
    description: '🩸 Estoy dispuesto a donar sangre y ayudar a salvar vidas',
    Icon: HeartIcon,
    requiredRoles: [ROL.USER]
  },
  wantReceptor: {
    path: '/want-receptor/',
    subPaths: '/want-receptor/details',
    title: 'Registrar Receptor de Sangre',
    description: '📝 Registrar nuevo receptor para recibir sangre',
    Icon: UserPlusIcon,
    requiredRoles: [ROL.USER]
  },

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

const vlipRoute = 9
export const firstRoutes = Object.entries(ROUTES).splice(0, vlipRoute)
export const endRoutes = Object.entries(ROUTES).splice(vlipRoute + 1, -1)

interface IMatchRoute {
  path: string
  route: string
}

export const matchRoute = ({ path, route }: IMatchRoute) => {
  const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '\\d+')}$`)
  return route === path || regex.test(route)
}

export const PUBLIC_ROUTES = [
  ROUTES.home.path,
  ROUTES.practice.path,
  ROUTES.login.path,
  ROUTES.registerAccount.path
]
