'use strict'

var suite = new require('benchmark').Suite('dissoc property from Trie of 1')

var current = require('..')
var currentT = current.assoc(current.Trie(), 'key', 'val')

suite.add('current', function(){
	current.dissoc(currentT, 'key')
})

module.exports = suite