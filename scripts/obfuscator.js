const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { filter, forEach } = require('lodash');
const { obfuscate } = require('javascript-obfuscator');
const { join } = require('path');

const regex = /^(((\d+\.)(.+)(\.js))|((main\.)(.+)(\.js)))$/;

const CLIENT_DIRECTORY_PATH = join(__dirname, '..', 'client');
const directoryFiles = readdirSync(CLIENT_DIRECTORY_PATH);
const jsFileNames = filter(directoryFiles, file => regex.test(file));

const obfuscatorOptions = {
	compact: true,
	controlFlowFlattening: false,
	deadCodeInjection: false,
	debugProtection: false,
	debugProtectionInterval: false,
	disableConsoleOutput: true,
	identifierNamesGenerator: 'hexadecimal',
	log: false,
	renameGlobals: false,
	rotateStringArray: true,
	selfDefending: true,
	stringArray: true,
	stringArrayEncoding: false,
	stringArrayThreshold: 0.75,
	unicodeEscapeSequence: false,
};

forEach(jsFileNames, fileName => {
	console.info(`\nReading '${ fileName }'...`);
	const file = readFileSync(join(CLIENT_DIRECTORY_PATH, fileName), 'utf8');
	console.info(`  └─File '${ fileName }' read successfully.`);
	console.info(`     └─Obfuscating '${ fileName }'...`);
	const obfuscationResult = obfuscate(file, obfuscatorOptions);
	console.info(`        └─File '${ fileName }' obfuscated successfully.`);
	console.info(`           └─Writing '${ fileName }'...`);
	writeFileSync(join(CLIENT_DIRECTORY_PATH, fileName), obfuscationResult.getObfuscatedCode(), 'utf8');
	console.info(`              └─File '${ fileName }' written successfully.`);
});

process.exit();