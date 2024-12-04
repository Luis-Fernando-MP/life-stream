import { bloodTypeArr } from '@/shared/getBloodType'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as z from 'zod'

dayjs.extend(isSameOrBefore)

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
    .min(5, { message: 'Mínimo 5 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' })
    .regex(/^[a-zA-Z\s]*$/, 'Sin números o caracteres especiales'),
  lastName: z
    .string({ message: 'los apellidos son requeridos' })
    .min(5, { message: 'Mínimo 5 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' })
    .regex(/^[a-zA-Z\s]*$/, 'Sin números o caracteres especiales'),
  dni: z
    .string({ message: 'El DNI requerido' })
    .length(8, { message: 'DNI de 8 dígitos' })
    .regex(/^\d*$/, 'Solo números'),
  donationDate: z.string({ message: 'Escoge una fecha' }).refine(
    value => {
      const inputDate = dayjs(value, 'YYYY-MM-DD', true)
      const today = dayjs().startOf('day')
      return inputDate.isValid() && inputDate.isAfter(today)
    },
    { message: 'La fecha debe ser posterior a hoy' }
  ),

  lastDonationDate: z
    .string()
    .optional()
    .refine(
      value => {
        if (!value) return true // Si no se proporciona, es válido.
        const inputDate = dayjs(value, 'YYYY-MM-DD', true) // Valida formato y fecha.
        const today = dayjs().startOf('day')
        return inputDate.isValid() && inputDate.isSameOrBefore(today)
      },
      { message: 'La fecha no debe ser posterior a hoy' }
    )
})

export const heroRegisterResolver = zodResolver(scheme)
export type IHeroRegisterRes = z.infer<typeof scheme>
