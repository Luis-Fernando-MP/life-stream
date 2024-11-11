import { ImageIcon } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'

import './style.scss'

interface IImageUploader {
  onLoad: (image: string) => void
  defaultImage: string
}

const ImageUploader = ({ onLoad, defaultImage }: IImageUploader) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrc(reader.result as string)
      onLoad(reader.result as string)
    }
    reader.readAsDataURL(files[0])
  }

  useEffect(() => {
    setImageSrc(defaultImage)
  }, [defaultImage])

  return (
    <div className='imageUploader'>
      <label
        htmlFor='image-upload'
        style={{
          backgroundImage: `url(${imageSrc ?? ''})`
        }}
      >
        {!imageSrc && <ImageIcon size={24} />}
      </label>
      <input id='image-upload' type='file' accept='image/*' onChange={handleImageUpload} />
    </div>
  )
}

export default ImageUploader
