import { ClientOptions } from 'minio'

export interface ExtConfig {
  clientConfig: ClientOptions,
  bucket: string,
  directory: string
}

export interface UploadPics {
  buffer: Buffer | null,
  status: 'success' | 'empty'
}