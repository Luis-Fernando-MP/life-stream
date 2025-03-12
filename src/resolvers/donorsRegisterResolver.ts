import { bloodTypeArr } from '@/shared/getBloodType'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const scheme = z.object({
  bloodType: z.enum(bloodTypeArr as any, { message: 'Seleccione un tipo de sangre' }),
  age: z
    .number({ message: 'La edad es requerida' })
    .min(18, { message: 'Edad mínima: 18' })
    .max(65, { message: 'Edad máxima: 65' }),
  weight: z
    .number({ message: 'El peso es requerido' })
    .min(50, { message: 'Peso mínimo: 50 kg' })
    .max(150, { message: 'Peso máximo: 150 kg' }),
  firstName: z
    .string({ message: 'los nombres son requeridos' })
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/, 'Sin números o caracteres especiales'),
  lastName: z
    .string({ message: 'los apellidos son requeridos' })
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/, 'Sin números o caracteres especiales'),
  dni: z.string({ message: 'El DNI requerido' }).length(8, { message: 'DNI de 8 dígitos' }).regex(/^\d*$/, 'Solo números'),
  photo: z.string({ message: 'La foto es requerida' }),
  lastDonationDate: z.any({ message: 'Escoge una fecha' })
})

export const donorsRegisterResolver = zodResolver(scheme)
export type IDonorsRegisterRes = z.infer<typeof scheme>
