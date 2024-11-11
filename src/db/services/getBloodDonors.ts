'use server'

import { prisma } from '..'

export async function findBloodDonor(dni: string) {
  try {
    const response = await prisma.patient.findUnique({
      where: {
        DNI: dni
      }
    })
    console.log(response)
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
