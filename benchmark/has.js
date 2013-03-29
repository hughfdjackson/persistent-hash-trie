'use strict'

var _ = require('lodash')
var gen = require('./gen-data')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('has property with Trie of ' + quantity)
	var data = gen(quantity, Math.random())

	var test = function(name, p){
		var trie = _.reduce(data, function(trie, val, key){
			return p.assoc(trie, key, val)
		}, p.Trie())
		trie = p.assoc(trie, 'key', 'val')

		suite.add(name, function(){
			p.has(trie, 'key')
		})
	}

	test('current', require('..'))
	// test('v0.2.1', require('./previous-versions/0.2.1/'))
	// test('v0.2.2', require('./previous-versions/0.2.2/'))
	test('v0.2.3', require('./previous-versions/0.2.3/'))
	test('v0.2.4', require('./previous-versions/0.2.4/'))

	return suite
}

module.exports = makeSuite
