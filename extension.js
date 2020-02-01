// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const resource = vscode.workspace.getConfiguration('phabview').get("basePath")
const baseDir = vscode.workspace.getConfiguration('phabview').get("baseDir")
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const getURI = (repoName, path) => {
	const uri = `source/${repoName}/browse/master/${path}`;
	return uri
}

const parse = (file) => {

	try {
		const path =  file.split(baseDir)[1].split('/').filter(Boolean)

		const repoName = path[0]

		const new_path = path.splice(1,path.length-1).join('/')

		const uri = getURI(repoName, new_path)

		const link = resource+uri

		return link

	} catch(e) {

		console.log('Could not parse file path, please make sure you are in the right repository')
	}
}

const pbcopy = (data) => {
	// Get a fresh copy every time.
	const proc = require('child_process').spawn('pbcopy'); 
	proc.stdin.write(data);
	proc.stdin.end();
}

const copy = () => {

	try {
		const fi =  vscode.window.activeTextEditor.document.fileName
		console.log(fi)
		const filePath = fi
		pbcopy(parse(filePath))
		vscode.window.showInformationMessage('Phabricator String Copied to Clipboard !');
	}catch(e){
		console.log(e)
	}

}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.phabview', copy);

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
