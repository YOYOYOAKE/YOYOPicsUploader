import * as vscode from 'vscode'
import { AppContext } from '../utils/app-context'
import { minioConfigSetter, pathConfigSetter } from './config-setter'

import { ConfigManager } from './config-manager'

// Minio 配置按钮的状态类
export class MinioConfBtn {
  private static instance: MinioConfBtn
  private button: vscode.StatusBarItem | null = null

  private constructor() { }

  // 注册 Minio 配置按钮
  public registerMinioConfigButton() {
    this.button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0)
    this.button.text = "$(gear) 尚未选择 Minio 配置"
    this.button.tooltip = "切换或添加 Minio 配置"
    this.button.command = `${AppContext.extName}.openMinioConfigList`
    this.button.show()

    const disposable = vscode.commands.registerCommand(
      `${AppContext.extName}.openMinioConfigList`,
      minioConfigSetter
    )
    AppContext.extContext.subscriptions.push(this.button, disposable)
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
    this.button.text = "$(gear) 尚未选择上传路径"
    this.button.tooltip = "切换或添加上传路径"
    this.button.command = `${AppContext.extName}.openPathConfigList`
    this.button.show()

    const disposable = vscode.commands.registerCommand(
      `${AppContext.extName}.openPathConfigList`,
      pathConfigSetter
    )
    AppContext.extContext.subscriptions.push(this.button, disposable)
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
    }
  }

  public static getInstance(): PathConfBtn {
    if (!PathConfBtn.instance) {
      PathConfBtn.instance = new PathConfBtn()
    }
    return PathConfBtn.instance
  }
}