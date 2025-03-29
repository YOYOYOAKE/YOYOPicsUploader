import { UploadPics } from "../types"
import sharp from 'sharp'

export const transFormat = (pic: UploadPics): Promise<Buffer> => {
  return sharp(pic.buffer as Buffer)
    .toFormat('webp', {
      quality: 80,
      lossless: false,
      alphaQuality: 100,
      effort: 6
    })
    .toBuffer()
}