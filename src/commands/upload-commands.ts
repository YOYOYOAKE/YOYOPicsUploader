import * as vscode from 'vscode'
import { getClipboardPic } from "./get-clipboard-pic"
import { transFormat } from '../utils/trans-format'
import { uploadPic } from '../services/uploader'
import { pastePic } from '../utils/paste-pic'

export const uploadClipboardPic = async (): Promise<void> => {

  const rawPic = await getClipboardPic()

  if (rawPic.status === 'empty' || rawPic.buffer === null) {
    vscode.window.showInformationMessage('剪贴板中没有图片')
    return
  }

  const webpBuffer = await transFormat(rawPic)

  const picUrlArray = await uploadPic(webpBuffer)

  const picUrl = picUrlArray.join('/')

  const filename = picUrlArray[picUrlArray.length - 1]

  vscode.window.showInformationMessage(`图片已上传至：${picUrl}`)

  pastePic(picUrl, filename)
}