import * as vscode from 'vscode'

export const pastePic = async (picUrl: string, filename: string): Promise<void> => {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }

  const position = editor.selection.active
  editor.edit((editBuilder) => {
    editBuilder.insert(position, `![${filename}](${picUrl})`)
  })
}