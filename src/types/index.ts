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

export interface MinioConfig {
  name: string
  serverAddress: string
  accessKey: string
  secretKey: string
}

export interface PathConfig {
  bucket: string
  directory: string
}