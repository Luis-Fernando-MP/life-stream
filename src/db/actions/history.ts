import { QueryHistory } from '@prisma/client'

export async function fetchHistories(userId: string): Promise<QueryHistory[]> {
  try {
    const response = await fetch(`/api/histories?id=${userId}`)
    if (!response.ok) throw new Error(`Error fetching histories: ${response.statusText}`)
    const histories = await response.json()
    return histories
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
