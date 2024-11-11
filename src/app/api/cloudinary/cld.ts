import { CldImageResponse } from './CldImageResponse.type'
import cloudinary from './cloud'

interface IUploadCloudinaryStream {
  imageBase64: string
}

export const uploadCloudinaryBase64 = async ({
  imageBasedata64
}: IUploadCloudinaryStream): Promise<CldImageResponse> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${matches[1]};base64,${matches[2]}`,
      {
        upload_preset: process.env.CLOUDINARY_PRESET,
        folder: process.env.CLOUDINARY_PRESET
      }
    )

    if (!uploadResponse) throw new Error('Error saving image')
    return uploadResponse as CldImageResponse
  } catch (error: any) {
    throw new Error(error)
  }
}
