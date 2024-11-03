export interface Person {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  state: any
  num: number
}

export interface Doctor extends Person {
  id: string
  personID: string
  doctorRol: 'DOCTOR_MEMBER' | 'DOCTOR_ADMIN'
}

export interface Patient extends Person {
  id: string
  personID: string
  age: number
  weight: number
  bloodType: BloodType
  DNI: string
}

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface BloodDonor extends Patient {
  id: string
  patientID: string
  lastDonation: string // ISO String
  AuthorID: string
}

export interface BloodReceiver extends Patient {
  id: string
  patientID: string
  AuthorID: string
  createdAt: string // ISO String
}

const generateId = (): string => Math.random().toString(36).substr(2, 9)

const generatePerson = (i: number): Person => ({
  id: generateId(),
  firstName: `FirstName${i}`,
  lastName: `LastName${i}`,
  email: `email${i}@example.com`,
  username: `user${i}`,
  num: 50 + Math.floor(Math.random() * 1000),
  state: ['ACTIVE', 'INACTIVE'][Math.floor(Math.random() * 2)]
})

const generateDoctors = (persons: Person[]): Doctor[] =>
  persons.slice(0, 3).map(person => ({
    id: generateId(),
    personID: person.id,
    ...person,
    doctorRol: ['DOCTOR_MEMBER', 'DOCTOR_ADMIN'][Math.floor(Math.random() * 2)]
  }))

const generatePatients = (persons: Person[]): Patient[] =>
  persons.slice(3, 8).map(person => ({
    id: generateId(),
    personID: person.id,
    ...person,
    age: Math.floor(Math.random() * 60) + 18,
    weight: Math.floor(Math.random() * 50) + 50,
    bloodType: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][Math.floor(Math.random() * 8)],
    DNI: Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')
  }))

const generateBloodDonors = (patients: Patient[], doctors: Doctor[]): BloodDonor[] =>
  patients.slice(0, 3).map(patient => ({
    id: generateId(),
    patientID: patient.id,
    ...patient,
    lastDonation: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    AuthorID: doctors[0].id
  }))

const generateBloodReceivers = (patients: Patient[], doctors: Doctor[]): BloodReceiver[] =>
  patients.slice(3).map(patient => ({
    id: generateId(),
    patientID: patient.id,
    ...patient,
    AuthorID: doctors[1].id,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }))

export const generateFakeData = (): {
  persons: Person[]
  doctors: Doctor[]
  patients: Patient[]
  bloodDonors: BloodDonor[]
  bloodReceivers: BloodReceiver[]
} => {
  const persons = Array.from({ length: 21 }, generatePerson)
  const doctors = generateDoctors(persons)
  const patients = generatePatients(persons)
  const bloodDonors = generateBloodDonors(patients, doctors)
  const bloodReceivers = generateBloodReceivers(patients, doctors)
  return { persons, doctors, bloodDonors, bloodReceivers, patients }
}
