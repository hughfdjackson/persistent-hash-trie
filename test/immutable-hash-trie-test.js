'use strict'

var a = require('assert')
var ht = require('..')
var _ = require('lodash')

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

