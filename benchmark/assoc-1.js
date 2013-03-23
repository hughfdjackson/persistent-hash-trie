'use strict'

var suite = new require('benchmark').Suite('assoc 1 property with Trie')

var current = require('..')
var currentT = current.Trie()

suite.add('current', function(){
	current.assoc(currentT, 'key', 'val')
})

module.exports = suite