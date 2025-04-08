import * as vscode from 'vscode'
import { AppContext } from '../utils/app-context'
import { MinioConfig, PathConfig } from '../types'
import { ConfigManager } from './config-manager'

export const minioConfigSetter = async () => {
  const minioConfigList = vscode.workspace.getConfiguration(AppContext.extName).minioServices as MinioConfig[]

  const selected = await vscode.window.showQuickPick(
    minioConfigList.map(config => ({
      label: config.name,
      config
    })),
    {
      placeHolder: '选择 Minio 服务配置'
    }
  )

  if (selected) {
    ConfigManager.getInstance().setMinioConfig(selected.config)
  }
}

export const pathConfigSetter = async () => {
  const pathConfigList = vscode.workspace.getConfiguration(AppContext.extName).uploadPaths as PathConfig[]

  const selected = await vscode.window.showQuickPick(
    pathConfigList.map(config => ({
      label: `${config.bucket}/${config.directory}`,
      config
    })),
    {
      placeHolder: '选择上传路径配置'
    }
  )

  if (selected) {
    ConfigManager.getInstance().setPathConfig(selected.config)
  }
}