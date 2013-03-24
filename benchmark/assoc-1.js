'use strict'

var suite = new require('benchmark').Suite('assoc 1 property with Trie')

var test = function(name, im){ 
	var trie = im.Trie()

	suite.add(name, function(){
		im.assoc(trie, 'key', 'val')
	})
}

test('current', require('..'))
test('v0.2.1', require('./previous-versions/0.2.1/'))

module.exports = suite