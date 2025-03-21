interface ISetUserHistory {
  body: any
}

export async function setUseDonors({ body }: ISetUserHistory) {
  try {
    const response = await fetch(`/api/donors`, { method: 'POST', body: JSON.stringify(body) })
    if (!response.ok) throw new Error(`Error saving donors: ${response.statusText}`)
    const donor = await response.json()
    return donor
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
