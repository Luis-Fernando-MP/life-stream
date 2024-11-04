'use server'

import { prisma } from '..'

export async function findBloodDonor(dni: string) {
  try {
    const response = await prisma.patient.findUnique({
      where: {
        DNI: dni
      }
    })
    // if (!response.ok) throw new Error(`Error fetching histories: ${response.statusText}`)
    // const histories = await response.json()
    console.log(response)
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
