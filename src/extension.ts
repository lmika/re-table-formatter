'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as tableformatter from './tableformatter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "test-hello-world" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.formatTable', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);
        let table = tableformatter.Table.parse(text);

        editor.edit(editBuilder => {
            editBuilder.delete(selection);
            editBuilder.insert(selection.start, table.format());
        })

        // Display a message box to the user
        //vscode.window.showInformationMessage('Selected characters: ' + text.length);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}