'use strict'

var a = require('assert')
var ht = require('..')

describe('transient', function(){
    it('should return a mutable version of a Trie', function(){
        var t1 = ht.assoc(ht.Trie(), 'key', 'value')
        var t2 = ht.assoc(t1, 'other-key', 'other-value')

        var o = ht.transient(t2)
        a.deepEqual(o, { key: 'value', 'other-key': 'other-value' })
    })
})