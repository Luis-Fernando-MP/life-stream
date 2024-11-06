import { BloodType } from '@prisma/client'

const bloodTypeAbbreviations: Record<BloodType, string> = {
  [BloodType.A_POSITIVE]: 'A+',
  [BloodType.A_NEGATIVE]: 'A-',
  [BloodType.B_POSITIVE]: 'B+',
  [BloodType.B_NEGATIVE]: 'B-',
  [BloodType.AB_POSITIVE]: 'AB+',
  [BloodType.AB_NEGATIVE]: 'AB-',
  [BloodType.O_POSITIVE]: 'O+',
  [BloodType.O_NEGATIVE]: 'O-'
}

export function getBloodType(bloodType: BloodType) {
  return {
    value: BloodType[bloodType],
    abbreviation: bloodTypeAbbreviations[bloodType]
  }
}
