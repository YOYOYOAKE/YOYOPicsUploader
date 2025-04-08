import dayjs from 'dayjs'
import * as vscode from 'vscode'
import { ConfigManager } from './config-manager'
import { getMinioClient } from './minio-client'
import { AppContext } from '../utils/app-context'

export const uploadPic = async (webpBuffer: Buffer): Promise<string[]> => {
  const minioClient = getMinioClient()
  const { clientConfig: { endPoint, useSSL }, bucket, directory } = ConfigManager.getInstance().getConfig()

  const filename = `${dayjs().valueOf()}.webp`

  try {
    await minioClient.putObject(
      bucket,
      `${directory}/${filename}`,
      webpBuffer,
      webpBuffer.length,
      { 'Content-Type': 'image/webp' }
    )
  } catch (error) {
    vscode.window.showErrorMessage(String(error), '转到设置').then((selection) => {
      if (selection === '转到设置') {
        vscode.commands.executeCommand('workbench.action.openSettings', AppContext.extName)
      }
    })
    throw error
  }

  return [
    useSSL ? 'https:/' : 'http:/',
    endPoint,
    bucket,
    directory,
    filename
  ]
}