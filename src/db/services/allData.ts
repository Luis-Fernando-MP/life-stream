'use server'

import { auth } from '@clerk/nextjs/server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
export async function fetchAllData() {
  try {
    const { getToken } = auth()
    const token = await getToken()

    const response = await fetch(`${baseUrl}/api/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) throw new Error(`Error fetching all data: ${response.statusText}`)
    const all = await response.json()
    console.log('res', all)

    return all
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
