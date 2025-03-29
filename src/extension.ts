import * as vscode from 'vscode'
import { AppContext } from './utils/app-context'
import { registerCommands } from './commands/register-commands'

export function activate(context: vscode.ExtensionContext) {
	console.log("Extension activated")
	AppContext.init(context)
	registerCommands()
}

export function deactivate() { }