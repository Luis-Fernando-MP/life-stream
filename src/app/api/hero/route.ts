import { prisma } from '@/db'
import { getBloodTypeFromAbbreviation } from '@/shared/getBloodType'
import { auth } from '@clerk/nextjs/server'
import { BloodType, FulfilledType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function getPerson(userId: string) {
  const person = await prisma.person.findUnique({ where: { id: userId } })
  if (!person) throw new Error('Tu cuenta no está asociada a una persona. Contacta al soporte.')
  return person
}

async function updatePerson(userId: string, data: any) {
  const personData = { firstName: data.firstName, lastName: data.lastName }
  const existPerson = await getPerson(userId)
  return await prisma.person.update({
    where: { id: existPerson.id },
    data: personData
  })
}

async function updateOrCreatePatient(personId: string, data: any) {
  const bloodType = getBloodTypeFromAbbreviation(data.bloodType) ?? BloodType.A_POSITIVE
  const patientData = {
    age: Number(data.age),
    weight: Number(data.weight),
    bloodType: bloodType as BloodType,
    DNI: String(data.dni),
    personID: personId
  }
  const existPatient = await prisma.patient.findUnique({ where: { personID: personId } })
  return await prisma.patient.upsert({
    where: { id: existPatient?.id },
    update: patientData,
    create: patientData
  })
}

async function updateOrCreateDonor(userId: string, patientId: string, lastDonationDate: string) {
  const donorData = { AuthorID: userId, patientID: patientId, lastDonation: lastDonationDate }
  const existDonor = await prisma.bloodDonor.findUnique({ where: { patientID: patientId } })
  return await prisma.bloodDonor.upsert({
    where: { id: existDonor?.id },
    update: { lastDonation: lastDonationDate },
    create: donorData,
    include: { patient: { include: { person: true } } }
  })
}

async function createDonation(donorId: string, donationDate: string) {
  return await prisma.bloodDonation.create({
    data: {
      fulfilled: FulfilledType.PROCESS,
      donationDate,
      bloodDonorId: donorId
    }
  })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'No estás registrado. Por favor, inicia sesión.' }, { status: 401 })
  }

  try {
    const personTransaction = await updatePerson(userId, data)
    const patientTransaction = await updateOrCreatePatient(personTransaction.id, data)
    const donorTransaction = await updateOrCreateDonor(userId, patientTransaction.id, data.lastDonationDate)
    const donationTransaction = await createDonation(donorTransaction.id, data.donationDate)

    return NextResponse.json({ donor: donorTransaction, donation: donationTransaction }, { status: 200 })
  } catch (error: any) {
    console.error('Error en la operación:', error)
    return NextResponse.json(
      { error: error.message || 'Ocurrió un error inesperado al procesar la solicitud. Inténtalo más tarde.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') ?? ''
    const person = await getPerson(id)

    const patient = await prisma.patient.findUnique({ where: { personID: person.id } })
    if (!patient) throw new Error('No se encontró un paciente asociado a tu cuenta.')

    const donor = await prisma.bloodDonor.findUnique({ where: { patientID: patient.id } })
    const donations = donor ? await prisma.bloodDonation.findMany({ where: { bloodDonorId: donor.id } }) : []

    return NextResponse.json({ donations, person, patient }, { status: 200 })
  } catch (error: any) {
    console.error('Error en la operación:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { heroId } = await req.json()

  try {
    const donation = await prisma.bloodDonation.findUnique({ where: { id: heroId } })
    if (!donation) throw new Error('No se encontró una donación asociada a tu cuenta.')
    await prisma.bloodDonation.delete({ where: { id: heroId } })

    return NextResponse.json({ message: 'Donación eliminada' }, { status: 200 })
  } catch (error: any) {
    console.error('Error en la operación:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
