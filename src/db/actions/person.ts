import { Person, PersonStatus } from '@prisma/client'

import { prisma } from '..'

export async function createPerson(personDate: Person) {
  try {
    const response = await prisma.person.create({
      data: personDate
    })
    return response
  } catch (error: any) {
    console.log(error?.message ?? error)
  }
}

export async function updatePerson(id: string, personDate: Person) {
  try {
    const response = await prisma.person.update({
      where: { id },
      data: personDate
    })
    return response
  } catch (error: any) {
    console.log(error?.message ?? error)
  }
}

export async function deletePerson(id: string) {
  try {
    const person = await getPerson(id)
    const response = await prisma.person.update({
      where: { id: person?.id },
      data: { state: PersonStatus.DELETED }
    })
    return response
  } catch (error: any) {
    console.log(error?.message ?? error)
  }
}

export async function getPerson(id: string) {
  try {
    const response = await prisma.person.findUnique({
      where: { id }
    })
    if (!response) throw new Error('Person not found')

    return response
  } catch (error: any) {
    console.log(error?.message ?? error)
  }
}
