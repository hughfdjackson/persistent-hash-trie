'use strict'

var a = require('assert')
var im = require('..')
var _ = require('lodash')

describe('assoc/dissoc/has/get', function(){
    it('should be able to assoc/get', function(){
        var t = im.assoc(im.Trie(), 'key', 'value')

        a.equal(im.get(t, 'key'), 'value')
        a.equal(im.get(t, 'age'), undefined)
    })

    it('should be able to assoc/has', function(){
        var t = im.assoc(im.Trie(), 'key', 'value')

        a.equal(im.has(t, 'key'), true)
        a.equal(im.has(t, 'age'), false)
    })

    it('should be able to assoc/dissoc', function(){
        var t1 = im.assoc(im.Trie(), 'key', 'value')
        var t2 = im.dissoc(t1, 'key')

        a.equal(im.has(t1, 'key'), true)
        a.equal(im.has(t2, 'key'), false)
    })

    it('should be able to assoc 2 values', function(){
        var t1 = im.assoc(im.Trie(), 'key', 'value')
        var t2 = im.assoc(t1, 'other-key', 'other-value')

        a.equal(im.has(t1, 'key'), true)
        a.equal(im.has(t1, 'other-key'), false)

        a.equal(im.has(t2, 'key'), true)
        a.equal(im.has(t2, 'other-key'), true)
    })
})

