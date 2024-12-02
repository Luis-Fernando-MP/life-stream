interface ISetUserHistory {
  body: any
}

export async function setReceptorsFetch({ body }: ISetUserHistory) {
  try {
    const response = await fetch(`/api/receptors`, { method: 'POST', body: JSON.stringify(body) })
    if (!response.ok) throw new Error(`Error saving donors: ${response.statusText}`)
    const receptor = await response.json()
    return receptor
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
