import { ExtConfig, MinioConfig, PathConfig } from '../types'
import { MinioConfBtn, PathConfBtn } from './button-manager'

const parseAddress = (serverAddress: string) => {
  const [_, protocol, domain, port] = serverAddress.match(/^(https?:\/\/)([a-zA-Z0-9.-]+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d+))?/) || []

  return {
    protocol: protocol?.replace(/[:/]/g, '') || '',
    domain: domain || '',
    port: port || ''
  }
}

export class ConfigManager {
  private static instance: ConfigManager
  private currentMinioConfig: MinioConfig | null = null
  private currentPathConfig: PathConfig | null = null

  private constructor() { }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  public setMinioConfig(config: MinioConfig) {
    this.currentMinioConfig = config
    MinioConfBtn.getInstance().updateButton()
  }

  public setPathConfig(config: PathConfig) {
    this.currentPathConfig = config
    PathConfBtn.getInstance().updateButton()
  }

  public getMinioConfig(): MinioConfig | null {
    return this.currentMinioConfig
  }

  public getPathConfig(): PathConfig | null {
    return this.currentPathConfig
  }

  public getConfig(): ExtConfig {

    const { protocol, domain, port } = parseAddress(this.currentMinioConfig?.serverAddress || '')

    return {
      clientConfig: {
        endPoint: domain || '',
        port: parseInt(port) > 0 ? parseInt(port) : undefined,
        useSSL: protocol === 'https',
        accessKey: this.currentMinioConfig?.accessKey || '',
        secretKey: this.currentMinioConfig?.secretKey || ''
      },
      bucket: this.currentPathConfig?.bucket || '',
      directory: this.currentPathConfig?.directory || ''
    }
  }
}