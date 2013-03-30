'use strict'

var _ = require('lodash')
var gen = require('./gen-data')
var versions = require('./versions')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('keys of Trie with ' + quantity + ' members')
	var data = gen(quantity, Math.random())

	var test = function(o){
		var name = o.name
		var p = o.module

		var trie = _.reduce(data, function(trie, val, key){
			return p.assoc(trie, key, val)
		}, p.Trie())

		if ( p.keys ) {
			suite.add(name, function(){
				p.keys(trie)
			})
		}
	}

	_.each(versions, test)

	return suite
}

module.exports = makeSuite
