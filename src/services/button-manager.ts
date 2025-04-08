import * as vscode from 'vscode'
import { AppContext } from '../utils/app-context'
import { minioConfigSetter, pathConfigSetter } from './config-setter'
import { ConfigManager } from './config-manager'
import { MinioConfig, PathConfig } from '../types'

// Minio 配置按钮的状态类
export class MinioConfBtn {
  private static instance: MinioConfBtn
  private button: vscode.StatusBarItem | null = null

  private constructor() { }

  // 注册 Minio 配置按钮
  public registerMinioConfigButton() {
    this.button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0)

    // 读取 Minio 配置
    const minioConfig = AppContext.extContext.globalState.get('minioConfig') || undefined
    const { name } = (minioConfig as MinioConfig) || {}
    this.button.text = name ? `$(gear) ${name}` : "$(gear) 尚未选择 Minio 配置"
    this.button.command = `${AppContext.extName}.openMinioConfigList`
    this.button.show()

    const disposable = vscode.commands.registerCommand(
      `${AppContext.extName}.openMinioConfigList`,
      minioConfigSetter
    )
    AppContext.extContext.subscriptions.push(this.button, disposable)

    // 将当前的 Minio 配置写入 ConfigManager
    ConfigManager.getInstance().setMinioConfig(minioConfig as MinioConfig)
  }

  // 更新按钮状态
  public updateButton() {
    if (this.button) {
      const config = ConfigManager.getInstance().getMinioConfig()
      if (config) {
        this.button.text = `$(gear) ${config.name}`
      } else {
        this.button.text = "$(gear) 尚未选择 Minio 配置"
      }
      // 保存 Minio 配置
      AppContext.extContext.globalState.update('minioConfig', config)
    }
  }

  public static getInstance(): MinioConfBtn {
    if (!MinioConfBtn.instance) {
      MinioConfBtn.instance = new MinioConfBtn()
    }
    return MinioConfBtn.instance
  }
}

// 上传路径配置按钮的状态类
export class PathConfBtn {
  private static instance: PathConfBtn
  private button: vscode.StatusBarItem | null = null

  private constructor() { }

  // 注册上传路径配置按钮
  public registerPathConfigButton() {
    this.button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0)

    // 读取上传路径配置
    const pathConfig = AppContext.extContext.globalState.get('pathConfig') || undefined
    const { bucket, directory } = (pathConfig as PathConfig) || {}
    this.button.text = bucket && directory ? `$(gear) ${bucket}/${directory}` : "$(gear) 尚未选择上传路径"
    this.button.command = `${AppContext.extName}.openPathConfigList`
    this.button.show()

    const disposable = vscode.commands.registerCommand(
      `${AppContext.extName}.openPathConfigList`,
      pathConfigSetter
    )
    AppContext.extContext.subscriptions.push(this.button, disposable)

    // 将当前的上传路径配置写入 ConfigManager
    ConfigManager.getInstance().setPathConfig(pathConfig as PathConfig)
  }

  // 更新按钮状态
  public updateButton() {
    if (this.button) {
      const config = ConfigManager.getInstance().getPathConfig()
      if (config) {
        this.button.text = `$(gear) ${config.bucket}/${config.directory}`
      } else {
        this.button.text = "$(gear) 尚未选择上传路径"
      }
      // 保存上传路径配置
      AppContext.extContext.globalState.update('pathConfig', config)
    }
  }

  public static getInstance(): PathConfBtn {
    if (!PathConfBtn.instance) {
      PathConfBtn.instance = new PathConfBtn()
    }
    return PathConfBtn.instance
  }
}