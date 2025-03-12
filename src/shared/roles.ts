export const ROLES_DOCTOR_ACCESS = {
  ADMIN: 'org:admin',
  DOCTOR: 'org:doctor',
  DOCTOR_ADMIN: 'org:doctor_admin'
}

export const USER_ROLES = {
  ...ROLES_DOCTOR_ACCESS,
  USER: 'org:user'
}

export type ROL = keyof typeof USER_ROLES

export const validateRoutes = (roles: string[], userRol: ROL) => {
  const includeRoles = roles.includes(userRol)
  const rqRoles = roles.length > 0
  const haveRoles = !rqRoles || includeRoles
  return haveRoles
}
