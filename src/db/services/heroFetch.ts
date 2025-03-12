interface ISetUserHistory {
  body: any
}

export async function setHero({ body }: ISetUserHistory) {
  try {
    const response = await fetch(`/api/hero`, { method: 'POST', body: JSON.stringify(body) })
    if (!response.ok) throw new Error(`Error saving hero: ${response.statusText}`)
    const hero = await response.json()
    return hero
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

export async function getHeroDonations(id: string) {
  try {
    const response = await fetch(`/api/hero?id=${id}`)
    const body = await response.json()
    if (!response.ok) {
      throw new Error(`Error getting hero donations: ${body?.error || response.statusText}`)
    }
    return body
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

export async function deleteHero(id: string) {
  try {
    const response = await fetch(`/api/hero`, { method: 'DELETE', body: JSON.stringify({ heroId: id }) })
    if (!response.ok) throw new Error(`Error deleting hero: ${response.statusText}`)
    const body = await response.json()
    return body
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
