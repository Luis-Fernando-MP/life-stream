export enum ROL {
  ADMIN = 'org:admin',
  DOCTOR = 'org:doctor',
  DOCTOR_ADMIN = 'org:doctor_admin'
}

export const validateRoutes = (roles: string[], userRol: ROL) => {
  const includeRoles = roles.includes(userRol)
  const rqRoles = roles.length > 0
  const haveRoles = !rqRoles || includeRoles
  return haveRoles
}
