import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const scheme = z.object(
  {
    dni: z
      .string({
        message: 'El dni solo debe contener números'
      })
      .length(8, 'Tu dni debe de tener 8 dígitos')
      .regex(/^\d+$/, 'El dni solo debe contener números')
  },
  { description: 'filtro para validar un dni' }
)

export const dniResolver = zodResolver(scheme)
export type IDniResolver = z.infer<typeof scheme>
