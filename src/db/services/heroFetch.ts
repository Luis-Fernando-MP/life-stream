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
