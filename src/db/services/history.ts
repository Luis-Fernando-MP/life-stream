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

interface ISetUserHistory {
  body: string
}

export async function setUserHistory({ body }: ISetUserHistory): Promise<QueryHistory[]> {
  try {
    const response = await fetch(`/api/histories`, { method: 'POST', body: JSON.stringify(body) })
    if (!response.ok) throw new Error(`Error fetching histories: ${response.statusText}`)
    const histories = await response.json()
    return histories
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

export async function deleteUserHistory({ body }: any) {
  try {
    const response = await fetch(`/api/histories`, { method: 'DELETE', body: JSON.stringify(body) })
    if (!response.ok) throw new Error(`Error fetching histories: ${response.statusText}`)
    const isDeleted = await response.json()
    return isDeleted
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
