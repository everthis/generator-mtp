'use strict'
const fs = require('fs')
const path = require('path')

const apiDir = path.resolve(__dirname, './api')
const modulesDir = path.resolve(__dirname, './module')
const basename = path.basename(module.filename)
const jsonStr = JSON.stringify
const log = console.log
let modules = {}

function removeFalsePropFromObj(obj) {
	let clone = cloneObj(obj)
	for (let el in clone) {
		if (clone.hasOwnProperty(el) && !clone[el]) {
			delete clone[el]
		}
	}
	return clone
}

function ok() {
	return {
		status: 'success'
	}
}

function isAsyncFn(fn) {
	return fn[Symbol.toStringTag] === 'AsyncFunction' ? true : false
}
function camelCaseToSlash(str) {
	const upperChars = str.match(/([A-Z])/g)
	if (!upperChars) {
		return str
	}

	let res = str.toString()
	for (let i = 0, n = upperChars.length; i < n; i++) {
		res = res.replace(
			new RegExp(upperChars[i]),
			'/' + upperChars[i].toLowerCase()
		)
	}
	if (res.slice(0, 1) === '/') {
		res = res.slice(1)
	}
	return res
}

fs
	.readdirSync(modulesDir)
	.filter(function(file) {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		)
	})
	.forEach(function(file) {
		let m = require(path.join(modulesDir, file))
		if (m.moduleName) modules[m.moduleName] = m
	})

module.exports = {
	path,
	log,
	ok,
	jsonStr,
	removeFalsePropFromObj,
	camelCaseToSlash,
	isAsyncFn,
	modules,
	m: modules,
	apiDir,
	api: {}
}
