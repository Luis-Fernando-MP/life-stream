import { prisma } from '@/db'
import type { BloodDonor, BloodReceiver, Doctor, Patient, Person } from '@prisma/client'
import { NextResponse } from 'next/server'

// Tipos definidos
export type DoctorWithPerson = Doctor & { person: Person }
export type PatientWithPerson = Patient & { person: Person }
export type BloodDonorWithRel = BloodDonor & {
  patient: PatientWithPerson
  CreatedBy: Person
}
export type BloodReceiverWithRel = BloodReceiver & {
  patient: PatientWithPerson
  CreatedBy: Person
}

export type ApiAllData = {
  doctors: DoctorWithPerson[]
  patients: PatientWithPerson[]
  bloodDonors: BloodDonorWithRel[]
  bloodReceivers: BloodReceiverWithRel[]
}

// Forzar ruta dinámica
export const dynamic = 'force-dynamic'

export async function POST() {
  return NextResponse.json({ image: Date.now() })
}
export async function GET() {
  try {
    // Fetching datos desde Prisma
    const [doctors, patients, bloodDonors, bloodReceivers] = await Promise.all([
      prisma.doctor.findMany({ include: { person: true } }),
      prisma.patient.findMany({ include: { person: true } }),
      prisma.bloodDonor.findMany({
        include: { patient: { include: { person: true } }, CreatedBy: true }
      }),
      prisma.bloodReceiver.findMany({
        include: { patient: { include: { person: true } }, CreatedBy: true }
      })
    ])

    // Configuración de headers
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    })

    // Respuesta exitosa
    return NextResponse.json<ApiAllData>(
      { doctors, patients, bloodDonors, bloodReceivers },
      { status: 200, headers }
    )
  } catch (error: unknown) {
    console.error('Error fetching data:', error)

    // Manejo de errores genéricos
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
}
