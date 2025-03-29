import { commands } from 'vscode'
import { AppContext } from '../utils/app-context'
import { uploadClipboardPic } from './upload-commands'

export const registerCommands = () => {
  
  AppContext.extContext.subscriptions.push(
    commands.registerCommand(`${AppContext.extName}.upload-clipboard-pic`, uploadClipboardPic),
  )
}
