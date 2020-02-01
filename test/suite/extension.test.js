const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const ext = require('../../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('splice dirname', () => {
		assert.equal(ext.splice('/Users/hello/workspace/is/it/me/youre/looking/for.js'), 'https://phabricator.twitter.biz/source/is/browse/master/it/me/youre/looking/for.js')
	});
});
