'use strict'

var suite = new require('benchmark').Suite('get property from Trie of 1')

var current = require('..')
var currentT = current.assoc(current.Trie(), 'key', 'val')

suite.add('current', function(){
	current.get(currentT, 'key')
})

module.exports = suite