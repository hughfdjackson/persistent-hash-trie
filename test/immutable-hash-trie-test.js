'use strict'

var a = require('assert')
var ht = require('..')
var _ = require('lodash')

describe('Trie', function(){
    it('should construct properly', function(){
        var children = { 0: {} }
        var t = ht.Trie(children)

        a.equal(t.type, 'trie')
        a.deepEqual(t.children, children)
    })    
})

describe('Value', function(){
    it('should construct properly', function(){
        var key = 'my-key'
        var val = 'my-val'
        var v   = ht.Value(key, val)

        a.equal(v.type, 'value')
        a.equal(v.value, val)
        a.equal(v.key, key)
    })    
})

describe('Hashmap', function(){
    it('should construct properly', function(){
        var values = { 0: {} }
        var hm     = ht.Hashmap(values)

        a.equal(hm.type, 'hashmap')
        a.deepEqual(hm.values, values)

    })
})


describe('overriding default hash and eq opts', function(){

    var equal = function(){ return true }
    var hash = function(){ return 1 }
    var opts = { hash: hash, eq: equal }

    it('should be available in assoc', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value', opts)
        a.equal(t.children[1].key, 'key')
    })

    it('should be available in dissoc', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value', opts)
        var t = ht.dissoc(t, 'some-non-present-key', opts)

        a.ok(_.isEmpty(t.children))
    })

    it('should be available in get', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value', opts)
        a.equal(ht.get(t, 'some-non-present-key', opts), 'value')
    })

    it('should be avilable in has', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value', opts)
        a.equal(ht.has(t, 'some-non-present-key', opts), true)
    })
})




describe('basic CRUD', function(){

    it('should be able to assoc/get', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value')

        a.equal(ht.get(t, 'key'), 'value')
        a.equal(ht.get(t, 'age'), undefined)
    })

    it('should be able to assoc/has', function(){
        var t = ht.assoc(ht.Trie(), 'key', 'value')

        a.equal(ht.has(t, 'key'), true)
        a.equal(ht.has(t, 'age'), false)
    })

    it('should be able to assoc/dissoc', function(){
        var t1 = ht.assoc(ht.Trie(), 'key', 'value')
        var t2 = ht.dissoc(t1, 'key')

        a.equal(ht.has(t1, 'key'), true)
        a.equal(ht.has(t2, 'key'), false)
    })

    it('should be able to assoc 2 values', function(){
        var t1 = ht.assoc(ht.Trie(), 'key', 'value')
        var t2 = ht.assoc(t1, 'other-key', 'other-value')

        a.equal(ht.has(t1, 'key'), true)
        a.equal(ht.has(t1, 'other-key'), false)

        a.equal(ht.has(t2, 'key'), true)
        a.equal(ht.has(t2, 'other-key'), true)
    })
})


describe('transient', function(){
    it('should return a mutable version of a Trie', function(){
        var t1 = ht.assoc(ht.Trie(), 'key', 'value')
        var t2 = ht.assoc(t1, 'other-key', 'other-value')

        var o = ht.transient(t2)
        a.deepEqual(o, { key: 'value', 'other-key': 'other-value' })
    })
})
