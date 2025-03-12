import { prisma } from '@/db'
import { getBloodTypeFromAbbreviation } from '@/shared/getBloodType'
import { auth } from '@clerk/nextjs/server'
import { BloodType, FulfilledType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { userId } = await auth()

  console.log('data', data)

  if (!userId) {
    return NextResponse.json({ error: 'No estás registrado. Por favor, inicia sesión.' }, { status: 401 })
  }

  try {
    const result = await prisma.$transaction(async tx => {
      const person = await tx.person.findUnique({ where: { id: userId } })
      if (!person) throw new Error('Tu cuenta no está asociada a una persona. Contacta al soporte.')

      const bloodType = getBloodTypeFromAbbreviation(data.bloodType) ?? BloodType.A_POSITIVE
      const existPatient = await tx.patient.findUnique({ where: { personID: person.id } })

      const patientData = {
        age: Number(data.age),
        weight: Number(data.weight),
        bloodType: bloodType as BloodType
      }

      let patient
      if (existPatient) {
        patient = await tx.patient.update({
          data: patientData,
          where: { id: existPatient.id }
        })
      } else {
        patient = await tx.patient.create({
          data: {
            ...patientData,
            DNI: String(data.dni),
            personID: person.id
          }
        })
      }

      if (!patient) throw new Error('No se pudo crear o actualizar el paciente. Revisa los datos proporcionados.')

      let existDonor = await tx.bloodDonor.findUnique({ where: { patientID: patient.id } })

      const donorData = {
        AuthorID: userId,
        patientID: patient.id,
        lastDonation: data.lastDonationDate
      }

      let donor
      if (existDonor) {
        donor = await tx.bloodDonor.update({
          data: donorData,
          where: { id: existDonor.id }
        })
      } else {
        donor = await tx.bloodDonor.create({ data: donorData })
      }

      if (!donor) throw new Error('No se pudo crear o actualizar al donador de sangre.')

      const donation = await tx.bloodDonation.create({
        data: {
          fulfilled: FulfilledType.PROCESS,
          donationDate: data.donationDate,
          bloodDonorId: donor.id
        }
      })

      if (!donation) throw new Error('No se pudo registrar la donación.')

      return { donor, donation }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('Error en la operación:', error)
    const errorMessage = error.message || 'Ocurrió un error inesperado al procesar la solicitud. Inténtalo más tarde.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') ?? ''
    const person = await prisma.person.findUnique({ where: { id } })
    if (!person) throw new Error('Tu cuenta no está asociada a una persona. Contacta al soporte.')

    const patient = await prisma.patient.findUnique({ where: { personID: person.id } })
    if (!patient) throw new Error('No se encontró un paciente asociado a tu cuenta.')

    const donor = await prisma.bloodDonor.findUnique({ where: { patientID: patient.id } })

    if (!donor) return NextResponse.json({ donations: [], person, patient }, { status: 200 })

    const donations = await prisma.bloodDonation.findMany({ where: { bloodDonorId: donor?.id } })
    return NextResponse.json({ donations, person, patient }, { status: 200 })
  } catch (error: any) {
    console.error('Error en la operación:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
