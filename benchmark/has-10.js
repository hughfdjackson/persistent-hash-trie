'use strict'

var _ = require('lodash')

var suite = new require('benchmark').Suite('get property with Trie of 10')

var gen = require('./gen-data')
var data = gen(9, Math.random())

var current = require('..')
var currentT = _.reduce(data, function(trie, val, key){
	return current.assoc(trie, key, val)
}, current.Trie())
currentT = current.assoc(currentT, 'key', 'val')

suite.add('current', function(){
	current.has(currentT, 'key')
})

module.exports = suite