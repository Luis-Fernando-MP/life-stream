import { ApiAllData } from '@/app/api/allData/route'
import { URL } from '@/shared/constants'

export async function getAllData(token?: string | null) {
  try {
    let headers = undefined
    if (token) headers = { Authorization: `Bearer ${token}` }
    const response = await fetch(`${URL}/api/allDataData`, { headers })
    if (!response.ok) throw new Error(`Error fetching all data: ${response.statusText}`)
    const all = (await response.json()) as ApiAllData
    return all
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
