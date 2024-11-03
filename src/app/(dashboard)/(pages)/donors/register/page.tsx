'use client'

import type { JSX } from 'react'

const Page = (): JSX.Element => {
  async function fhClick() {
    try {
      const response = await fetch('/api/yt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: 'https://youtu.be/il5kTVVej1g?si=beTAVvJ43bH2U0y5' })
      })
      if (!response.ok) {
        throw new Error('Error fetching video info')
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to analyze video:', error)
    }
  }
  return (
    <div>
      <button onClick={fhClick}>bus</button>
    </div>
  )
}

export default Page
