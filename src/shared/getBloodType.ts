import { BloodType } from '@prisma/client'

export const bloodTypeAbb: Record<BloodType, string> = {
  [BloodType.A_POSITIVE]: 'A+',
  [BloodType.A_NEGATIVE]: 'A-',
  [BloodType.B_POSITIVE]: 'B+',
  [BloodType.B_NEGATIVE]: 'B-',
  [BloodType.AB_POSITIVE]: 'AB+',
  [BloodType.AB_NEGATIVE]: 'AB-',
  [BloodType.O_POSITIVE]: 'O+',
  [BloodType.O_NEGATIVE]: 'O-'
}

export const bloodTypeArr = Object.values(bloodTypeAbb)
export function getBloodType(bloodType: BloodType | undefined) {
  if (!bloodType) return
  return {
    value: BloodType[bloodType],
    abbreviation: bloodTypeAbb[bloodType]
  }
}

export function getBloodTypeFromAbbreviation(abbreviation: string): string | undefined {
  const entry = Object.entries(bloodTypeAbb).find(([, abbr]) => abbr === abbreviation)
  return entry ? entry[0] : undefined
}
