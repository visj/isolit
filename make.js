const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * 
 * @returns {string}
 */
String.prototype.trimExcludes = function () {
	return this
		.split(/\/\*\s*@exclude\s*\*\/[ \t]*/g)
		.filter((_, i) => i % 2 === 0)
		.join('');
}

/**
 *  
 * @returns {string}
 */
String.prototype.trimComments = function () {
	return this.replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '');
}

/**
 * 
 * @param {Object} obj 
 * @param {string} name 
 * @returns {string}
 */
String.prototype.replaceEnum = function (obj, name) {
	let str = this;
	for (const key in obj) {
		const val = obj[key];
		str = str.replace(new RegExp(name + '.' + key, 'g'), () => val);
	}
	return str;
}

/**
 * 
 * @param {string} name 
 * @param {number|string} value 
 * @returns {string}
 */
String.prototype.replaceVar = function (name, value) {
	return this.replace(new RegExp(name, 'g'), value);
}

/**
 * 
 * @returns {string}
 */
String.prototype.trimBits = function () {
	return this.replace(/\((?=.*\|)([\d\| ]+)\)/g, function (_, match) {
		let flag = 0;
		match
			.split('|')
			.map(part => part.trim())
			.forEach(bit => { flag |= parseInt(bit, 10); });
		return flag;
	})
}

/**
 * 
 * @returns {string}
 */
String.prototype.trimEmptyLines = function () {
	return this.split('\n').filter(x => x.trim() !== '').join('\n');
}

String.prototype.replaceExports = function (callback) {
	return this.replace(/module\.exports\s+=\s+{\s+([\w\:\s\,]+)\s+\}\;/g, callback)
}

String.prototype.replaceImports = function(callback) {
	return this.replace(/var\s+\{([\s\w,]+)\}\s+=\s+require\('anod'\);/g, callback)
}

function iife(str) {
	return '(function() {\n\t' + str + '\n})();';
}

function browserExport(_, match) {
	return 'window.isolit = {\n\t' +
		match
			.split(',')
			.filter(part => part !== '')
			.map(part => {
				const name = part.trim();
				return name + ': ' + name;
			}).join(',\n\t') + '\n};';
}

function browserImport(_, match) {
	return 'var anod = window.anod\n' + 
		match
			.split(',')
			.filter(part => part !== '')
			.map(part => {
				const name = part.trim();
				return 'var ' + name + ' = anod.' + name + ';' 
			}).join('\n');
}

function nodeExport(_, match) {
	return 'module.exports = {\n\t' +
		match
			.split(',')
			.filter(part => part !== '')
			.map(part => {
				const name = part.trim();
				return name + ': ' + name;
			}).join(',\n\t') + '\n};';
}

function nodeImport(_, match) {
	return 'var anod = require(\'anod\');\n' +
		match
			.split(',')
			.filter(part => part !== '')
			.map(part => {
				const name = part.trim();
				return 'var ' + name + ' = anod.' + name + ';';
			}).join('\n')
}

function nodeModuleExport(_, match) {
	return (
		'export {\n' +
		match
			.split(',')
			.filter(part => part !== '')
			.map(part => {
				return '  ' + part.split(':')[0].trim() + ','
			}).join('\n') +
		'\n}'
	);
}

function nodeModuleImport(_, match) {
	return 'import {' +
		match
			.split(',')
			.filter(part => part !== '')
			.join(',')
		+ ' } from \'anod\';\n'
}

(function main() {
	const src = path.join(__dirname, 'src');
	const dist = path.join(__dirname, 'dist');
	const srcFile = path.join(src, 'index.js');
	let file = fs
		.readFileSync(srcFile)
		.toString()
		.trimExcludes();

	const isolit = require(srcFile);

	file = file.trimComments();

	const js =
		iife(
			file
				.replaceExports(browserExport)
				.replaceImports(browserImport)
				.trimEmptyLines()
		);

	const cjs =
		file
			.replaceExports(nodeExport)
			.replaceImports(nodeImport)
			.trimEmptyLines();

	const mjs =
		file
			.replaceExports(nodeModuleExport)
			.replaceImports(nodeModuleImport)
			.trimEmptyLines();

	if (!fs.existsSync(dist)) {
		fs.mkdirSync(dist);
	}

	fs.writeFileSync(path.join(dist, 'isolit.mjs'), mjs);
	fs.writeFileSync(path.join(dist, 'isolit.cjs'), cjs);
	fs.writeFileSync(path.join(dist, 'isolit.js'), js);

	exec('npx esbuild --bundle --target=es5 --minify --outfile=dist/isolit.min.js dist/isolit.js', function (err, stderr) {
		console.log(err);
		fs.unlinkSync(path.join(dist, 'isolit.js'));
	});
})();