export async function getDonations() {
  try {
    const response = await fetch('/api/donations')

    if (!response.ok) throw new Error(`Error fetching all data: ${response.statusText}`)
    const donations = await response.json()
    return donations
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
