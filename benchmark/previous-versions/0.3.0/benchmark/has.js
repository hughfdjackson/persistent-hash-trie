'use strict'

var _ = require('lodash')
var gen = require('./gen-data')
var versions = require('./versions')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('has property with Trie of ' + quantity)
	var data = gen(quantity, Math.random())

	var test = function(o){
		var name = o.name
		var p = o.module

		var trie = _.reduce(data, function(trie, val, key){
			return p.assoc(trie, key, val)
		}, p.Trie())
		trie = p.assoc(trie, 'key', 'val')

		suite.add(name, function(){
			p.has(trie, 'key')
		})
	}

	_.each(versions, test)

	return suite
}

module.exports = makeSuite
