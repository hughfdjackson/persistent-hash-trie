'use strict'

var _ = require('lodash')
var gen = require('./gen-keys')
var versions = require('./versions')
var mori = require('mori')
var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('has property with Trie of ' + quantity)
	var keys = gen.words(quantity)

	var test = function(o){
		var name = o.name
		var p = o.module

		var trie = _.reduce(keys, function(trie, key){
			return p.assoc(trie, key, true)
		}, p.Trie())
		trie = p.assoc(trie, 'key', 'val')

		suite.add(name, function(){
			p.has(trie, 'key')
		})
	}

	_.each(versions, test)

    // mori benchmark
    var moriMap = _.reduce(keys, function(map, key){
        return mori.assoc(map, key, true)
    }, mori.hash_map())

    suite.add('mori', function(){
        mori.has_key(moriMap, 'key', 'val')
    })

	return suite
}

module.exports = makeSuite
