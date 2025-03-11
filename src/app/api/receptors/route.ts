import { prisma } from '@/db'
import { getBloodTypeFromAbbreviation } from '@/shared/getBloodType'
import { auth } from '@clerk/nextjs/server'
import { BloodType } from '@prisma/client'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

import cloudinary from '../cloudinary/cloud'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { userId } = auth()

  try {
    if (!userId) throw new Error('Are you registered?')

    const matches = data.photo.match(/^data:(.+);base64,(.+)$/)
    let photo = data.photo
    if (matches) {
      const uploadResponse = await cloudinary.uploader.upload(`data:${matches[1]};base64,${matches[2]}`, {
        upload_preset: process.env.CLOUDINARY_PRESET,
        folder: process.env.CLOUDINARY_PRESET
      })
      if (!uploadResponse) throw new Error('Fail to save user image')
      photo = uploadResponse.secure_url
    }

    const personData = {
      firstName: data.firstName,
      lastName: data.lastName,
      photo
    }

    let person
    if (data.personId) {
      person = await prisma.person.update({
        data: personData,
        where: { id: data.personId }
      })
    } else {
      person = await prisma.person.create({
        data: {
          ...personData,
          username: data.firstName,
          email: `${nanoid()}-${data.firstName}@gmail.com`
        }
      })
    }

    const patientData: any = {
      age: Number(data.age),
      weight: Number(data.weight),
      bloodType: getBloodTypeFromAbbreviation(data.bloodType) ?? BloodType.A_POSITIVE
    }

    let patient
    if (data.patientId) {
      patient = await prisma.patient.update({
        data: patientData,
        where: { DNI: data.patientId }
      })
    } else {
      patient = await prisma.patient.create({
        data: {
          ...patientData,
          DNI: String(data.dni),
          personID: person.id
        }
      })
    }

    const receptor = await prisma.bloodReceiver.upsert({
      create: {
        AuthorID: userId,
        patientID: patient.id
      },
      update: {
        AuthorID: userId
      },
      where: { patientID: patient.id },
      include: {
        patient: {
          include: { person: true }
        }
      }
    })
    return NextResponse.json({ receptor }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
