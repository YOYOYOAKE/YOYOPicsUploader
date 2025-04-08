import { commands } from 'vscode'
import { AppContext } from '../utils/app-context'
import { uploadClipboardPic } from './upload-commands'
import { MinioConfBtn, PathConfBtn } from '../services/button-manager'

export const registerCommands = () => {
  
  AppContext.extContext.subscriptions.push(
    commands.registerCommand(`${AppContext.extName}.upload-clipboard-pic`, uploadClipboardPic),
  )

  MinioConfBtn.getInstance().registerMinioConfigButton()
  PathConfBtn.getInstance().registerPathConfigButton()
}
