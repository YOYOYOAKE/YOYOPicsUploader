import * as vscode from 'vscode'
import { Client } from 'minio'
import { getConfig } from './config-manager'
import { AppContext } from '../utils/app-context'

export const getMinioClient = (): Client => {
  try {
    const client = new Client(getConfig().clientConfig)
    return client
  }
  catch (error) {
    vscode.window.showErrorMessage('扩展配置错误', '转到设置').then((selection) => {
      if (selection === '转到设置') {
        vscode.commands.executeCommand('workbench.action.openSettings', AppContext.extName)
      }
    })
    throw error
  }
}