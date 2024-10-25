import { DEV_ENV, DEV_MODE } from '@/shared/constants'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  })

if (DEV_ENV !== DEV_MODE.PROD) globalForPrisma.prisma = prisma
