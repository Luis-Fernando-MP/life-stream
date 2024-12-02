'use server'

import { prisma } from '@/db'
import { auth } from '@clerk/nextjs/server'

export async function cleanHistory() {
  const { userId } = auth()
  if (!userId) return
  const isDeleted = await prisma.queryHistory.deleteMany({
    where: {
      personId: userId
    }
  })
  return isDeleted
}
