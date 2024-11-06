import { prisma } from '@/db'
import type { BloodDonor, BloodReceiver, Doctor, Patient, Person } from '@prisma/client'
import { NextResponse } from 'next/server'

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

export type ApiAllItemData =
  | DoctorWithPerson
  | PatientWithPerson
  | BloodDonorWithRel
  | BloodReceiverWithRel

export type ApiAllData = {
  doctors: DoctorWithPerson[]
  patients: PatientWithPerson[]
  bloodDonors: BloodDonorWithRel[]
  bloodReceivers: BloodReceiverWithRel[]
}

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { person: true }
    })

    const patients = await prisma.patient.findMany({
      include: { person: true }
    })

    const bloodDonors = await prisma.bloodDonor.findMany({
      include: { patient: { include: { person: true } }, CreatedBy: true }
    })

    const bloodReceivers = await prisma.bloodReceiver.findMany({
      include: { patient: { include: { person: true } }, CreatedBy: true }
    })

    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    })

    return NextResponse.json<ApiAllData>(
      {
        doctors,
        patients,
        bloodDonors,
        bloodReceivers
      },
      { status: 200, headers }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
