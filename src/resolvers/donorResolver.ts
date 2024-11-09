import { bloodTypeArr } from '@/shared/getBloodType'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import * as z from 'zod'

const scheme = z.object({
  bloodType: z.enum(bloodTypeArr as any),
  ageRange: z
    .tuple([])
    .rest(
      z
        .number({ message: 'La edad debería de estar en un rango de números' })
        .min(18, { message: 'El valor mínimo de la edad es de 18' })
        .max(65, { message: 'La edad maxima para el donante es 65 años' })
    ),
  weightRange: z
    .tuple([])
    .rest(
      z
        .number({ message: 'El peso debería de estar en un rango de números' })
        .min(50, { message: 'El valor mínimo del peso es de 50 kg' })
        .max(150, { message: 'El peso máximo del donante es de 150 kg' })
    ),
  firstName: z
    .string()
    .max(100, { message: 'Tu nombre no puede tener mas de 100 caracteres' })
    .regex(/^[a-zA-Z\s]*$/, 'Tu nombre no puede contener números ni caracteres especiales'),
  lastName: z
    .string()
    .max(100, { message: 'Tu apellido no puede tener mas de 100 caracteres' })
    .regex(/^[a-zA-Z\s]*$/, 'Tu apellido no puede contener números ni caracteres especiales'),
  dni: z
    .string()
    .regex(/^\d*$/, 'El DNI debe contener solo números')
    .max(8, { message: 'Un DNI no puede tener mas de 8 dígitos' }),
  lastDonationDate: z.date()
})

export const donorsSearchResolver = zodResolver(scheme)
export type IDonorsSearchRes = z.infer<typeof scheme>

export const ageRanges: [number, number][] = [
  [18, 25],
  [26, 35],
  [36, 45],
  [46, 55],
  [56, 65]
]

export const weightRanges = [
  [50, 70],
  [71, 90],
  [91, 110],
  [111, 130],
  [131, 150]
]

export const lastDonationDateMap = [
  dayjs().subtract(1, 'day').toDate(),
  dayjs().subtract(1, 'week').toDate(),
  dayjs().subtract(1, 'month').toDate(),
  dayjs().subtract(1, 'years').toDate(),
  dayjs().subtract(2, 'years').toDate()
]
