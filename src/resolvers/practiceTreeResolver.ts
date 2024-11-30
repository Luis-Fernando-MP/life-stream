import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const scheme = z.object({
  key: z.string({ message: 'escoge un árbol o tabla' }),
  quantity: z
    .number({ message: 'Agrega una cantidad de nodos' })
    .min(1, { message: 'Mínimo agrega 1 nodo' })
})

export const practiceTreeResolver = zodResolver(scheme)
export type IPracticeTreeResolver = z.infer<typeof scheme>
