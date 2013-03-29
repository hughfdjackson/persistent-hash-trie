'use strict'

var _ = require('lodash')
var gen = require('./gen-data')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('transient property with Trie of ' + quantity)
	var data = gen(quantity, Math.random())

	var test = function(name, im){ 
		var trie = _.reduce(data, function(trie, val, key){
			return im.assoc(trie, key, val)
		}, im.Trie())

		suite.add(name, function(){
			im.transient(trie)
		})
	}

	test('current', require('..'))
	test('v0.2.1', require('./previous-versions/0.2.1/'))

	return suite
}

module.exports = makeSuite