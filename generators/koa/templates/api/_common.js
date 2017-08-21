'use strict';
const path = require('path');

const pp = require('../../public/javascripts/pp');
const apiDir = path.resolve(__dirname, './api');
const jsonStr = JSON.stringify;
const log = console.log
const _ = require('lodash')
const ejs = require('ejs')

function removeFalsePropFromObj(obj) {
	let clone = cloneObj(obj);
	for(let el in clone) {
		if (clone.hasOwnProperty(el) && !clone[el]) {
			delete clone[el]
		}
	}
	return clone;
}

function ok() {
  return {
    status: 'success'
  }
}

function isAsyncFn(fn) {
  return fn[Symbol.toStringTag] === 'AsyncFunction' ? true : false
}

module.exports = {
	db,
	sequelize,
	util: {
	    path,
	    _,
	    ejs,
		pp,
	    log,
	    ok,
		jsonStr,
	    isAsyncFn,
		removeFalsePropFromObj
	},
    apiDir,
	api: {}
}
