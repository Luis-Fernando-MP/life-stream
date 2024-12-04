import { prisma } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export type PersonWithBloodDonor = Prisma.PersonGetPayload<{
  include: {
    bloodDonor: {
      include: { BloodDonation: true }
    }
  }
}>

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) throw new Error('No estás registrado. Por favor, inicia sesión')

    const person = await prisma.person.findUnique({
      where: { id: userId },
      include: {
        bloodDonor: {
          include: { BloodDonation: true }
        }
      }
    })
    return NextResponse.json({ ...person }, { status: 200 })
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}
