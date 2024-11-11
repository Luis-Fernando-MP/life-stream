// pages/api/uploadImage.ts
import { NextResponse } from 'next/server'

import cloudinary from './cloud'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    if (!data?.imageBase64) throw new Error('No image provided')

    const matches = data.imageBase64.match(/^data:(.+);base64,(.+)$/)
    if (!matches) {
      throw new Error('Invalid Base64 string')
    }

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${matches[1]};base64,${matches[2]}`,
      {
        upload_preset: process.env.CLOUDINARY_PRESET,
        folder: process.env.CLOUDINARY_PRESET
      }
    )

    setTimeout(
      async () => {
        try {
          await cloudinary.uploader.destroy(uploadResponse.public_id)
        } catch (err) {
          console.error('Error deleting image:', err)
        }
      },
      1000 * 60 * 5
    )

    return NextResponse.json({ image: uploadResponse.secure_url })
  } catch (error) {
    console.log(error)
    return new Response('Internal Error', { status: 500 })
  }
}
