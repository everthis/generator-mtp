'use strict'
const fs = require('fs')
const path = require('path')

const apiDir = path.resolve(__dirname, './api')
const modulesDir = path.resolve(__dirname, './modules')
const basename = path.basename(module.filename)
const jsonStr = JSON.stringify
const log = console.log
const _ = require('lodash')
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

fs
	.readdirSync(modulesDir)
	.filter(function(file) {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		)
	})
	.forEach(function(file) {
		let m = require(path.join(modulesDir, file))
		if (m.name) modules[m.name] = m
	})

module.exports = {
	util: {
		path,
		_,
		log,
		ok,
		jsonStr,
		isAsyncFn,
		removeFalsePropFromObj
	},
	modules,
	m: modules,
	apiDir,
	api: {}
}
