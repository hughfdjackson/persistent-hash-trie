'use strict'

var _ = require('lodash')

var suite = new require('benchmark').Suite('get property with Trie of 10')

var gen = require('./gen-data')
var data = gen(9, Math.random())

var test = function(name, im){ 
	var trie = _.reduce(data, function(trie, val, key){
		return im.assoc(trie, key, val)
	}, im.Trie())
	trie = im.assoc(trie, 'key', 'val')

	suite.add(name, function(){
		im.has(trie, 'key')
	})
}

test('current', require('..'))
test('v0.2.1', require('./previous-versions/0.2.1/'))

module.exports = suite