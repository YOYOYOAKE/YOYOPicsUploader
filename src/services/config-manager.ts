import * as vscode from 'vscode'
import { AppContext } from '../utils/app-context'
import { ExtConfig } from '../types'

const parseAddress = (serverAddress: string) => {
  const [_, protocol, domain, port] = serverAddress.match(/^(https?:\/\/)([a-zA-Z0-9.-]+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d+))?/) || []

  return {
    protocol: protocol?.replace(/[:/]/g, '') || '',
    domain: domain || '',
    port: port || ''
  }
}

export const getConfig = (): ExtConfig => {
  const config = vscode.workspace.getConfiguration(AppContext.extName)

  const serverAddress = config.get<string>('serverAddress') ?? ''
  const accessKey = config.get<string>('accessKey') ?? ''
  const secretKey = config.get<string>('secretKey') ?? ''
  const bucket = config.get<string>('bucket') ?? ''
  const directory = config.get<string>('directory') ?? ''

  const addressParts = parseAddress(serverAddress)

  return {
    clientConfig: {
      endPoint: addressParts.domain,
      port: parseInt(addressParts.port) > 0 ? parseInt(addressParts.port) : undefined,
      useSSL: addressParts.protocol === 'https',
      accessKey,
      secretKey
    },
    bucket,
    directory
  }
}