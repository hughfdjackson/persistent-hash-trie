'use strict'

var a = require('assert')
var ht = require('..')

suite('immutable-hash-trie: node types')

test('Trie', function(){
    var children = { 0: {} }
    var t = ht.Trie(children)

    a.equal(t.type, 'trie')
    a.deepEqual(t.children, children)
    a.ok(Object.isFrozen(t))
    a.ok(Object.isFrozen(t.children))
})

test('Value', function(){
    var key = 'my-key'
    var val = 'my-val'
    var v   = ht.Value(key, val)

    a.equal(v.type, 'value')
    a.equal(v.value, val)
    a.equal(v.key, key)

    a.ok(Object.isFrozen(v))
})

test('Hashmap', function(){
    var values = { 0: {} }
    var hm     = ht.Hashmap(values)

    a.equal(hm.type, 'hashmap')
    a.deepEqual(hm.values, values)
    a.ok(Object.isFrozen(hm.values))
    a.ok(Object.isFrozen(hm))
})


suite('immutable-hash-trie: basic CRUD')

test('assoc/get 1', function(){
    var t = ht.assoc(ht.Trie(), 'name', 'hugh')

    a.equal(ht.get(t, 'name'), 'hugh')
    a.equal(ht.get(t, 'age'), undefined)
})

test('assoc/has 1', function(){
    var t = ht.assoc(ht.Trie(), 'name', 'hugh')

    a.equal(ht.has(t, 'name'), true)
    a.equal(ht.has(t, 'age'), false)
})

test('assoc/dissoc 1', function(){
    var t1 = ht.assoc(ht.Trie(), 'name', 'hugh')
    var t2 = ht.dissoc(t1, 'name')

    a.equal(ht.has(t1, 'name'), true)
    a.equal(ht.has(t2, 'name'), false)
})

test('assoc 2', function(){
    var t1 = ht.assoc(ht.Trie(), 'name', 'hugh')
    var t2 = ht.assoc(t1, 'last-name', 'jackson')

    a.equal(ht.has(t1, 'name'), true)
    a.equal(ht.has(t1, 'last-name'), false)

    a.equal(ht.has(t2, 'name'), true)
    a.equal(ht.has(t2, 'last-name'), true)
})

test('transient', function(){
    var t1 = ht.assoc(ht.Trie(), 'name', 'hugh')
    var t2 = ht.assoc(t1, 'last-name', 'jackson')

    var o = ht.transient(t2)
    a.deepEqual(o, { name: 'hugh', 'last-name': 'jackson' })
})
