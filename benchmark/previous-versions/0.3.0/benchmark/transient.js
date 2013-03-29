'use strict'

var _ = require('lodash')
var gen = require('./gen-data')
var versions = require('./versions')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('mutable with Trie of ' + quantity)
	var data = gen(quantity, Math.random())

	var test = function(o){
		var name = o.name
		var p = o.module


		var trie = _.reduce(data, function(trie, val, key){
			return p.assoc(trie, key, val)
		}, p.Trie())

		// legacy implementations called this 'transient'
		var methodName = p.transient ? 'transient' : 'mutable'

		suite.add(name, function(){
			p[methodName](trie)
		})
	}

	_.each(versions, test)

	return suite
}

module.exports = makeSuite
