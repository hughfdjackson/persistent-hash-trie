'use strict'

var u = require('./util')
var hash = require('string-hash')

// # hashing operations

// mask :: int, int -> int
// get a <= 5 bit section of a hash, shifted from the left position
var mask = function(hash, from){ return (hash >>> from) & 0x01f }
var hashMask = function(val, from){ return mask(hash(val), from) }



// path :: string -> [int]
// get the maximal path to a key
var path =  function(k){ return hashPath(hash(k)) }

var Trie = function(children){
    return Object.freeze({ type: 'trie', children: Object.freeze(children || {}) })
}

var Value = function(key, value){
    return Object.freeze({ type: 'value', key: key, value: value })
}

var Hashmap = function(values){
    return Object.freeze({ type: 'hashmap', values: Object.freeze(values) })
}

// has :: node, [int], string -> bool
var has = function(trie, key, depth){
    return hasFns[trie.type](trie, key, depth || 0)
}

var hasFns = {
    trie: function(trie, key, depth){
        var child = trie.children[hashMask(key, depth)]

        if ( child === undefined )    return false
        if ( child.type === 'value' ) return has(child, key, depth)
        if ( child.type === 'trie' )  return has(child, key, depth + 1)
    },
    value: function(value, key, depth){
        return value.key === key
    },
    hashmap: function(){} // missing case?
}

// get :: node, [int], string -> val
var get = function(trie, key, depth){
    return getFns[trie.type](trie, key, depth)
}

var getFns = {
    trie: function(trie, key, depth){
        var child = trie.children[hashMask(key, depth)]
        if ( child === undefined )    return undefined
        if ( child.type === 'value' ) return get(child, key, depth)
        else                          return get(child, key, depth + 1)
    },
    value: function(value, key, depth){
        if ( value.key === key ) return value.value
    },
    hashmap: function(hashmap, key, depth){
        var v = hashmap.values[key]
        if ( v ) return v.value
    }
}

var copyAdd = function(o, k, v){
    o = u.clone(o)
    o[k] = v
    return o
}

var assoc = function(node, key, val, depth){
    return assocFns[node.type](node, key, val, depth || 0)
}

var assocFns = {
    trie: function(trie, key, val, depth){
        var child = trie.children[hashMask(key, depth)]

        if ( child === undefined  ) return Trie(copyAdd(trie.children, hashMask(key, depth), Value(key, val)))
        else                        return Trie(copyAdd(trie.children, hashMask(key, depth), assoc(child, key, val, depth + 1)))
    },
    value: function(value, key, val, depth){
        if ( value.key === key ) return Value(key, val, path)

        // resolve shallow conflict
        if ( hashMask(key, depth) !== hashMask(value.key, depth) ) {
            var cs = {}
            cs[hashMask(value.key, depth)] = Value(value.key, value.value)
            cs[hashMask(key, depth)]       = Value(key, val)
            return Trie(cs)
        }

        // resolve deep conflict
        if ( depth !== 6 ) {

            var val1 = Value(value.key, value.value)
            var val2 = Value(key, val)

            var cs = {}
            cs[hashMask(key, depth)] = val2
            return assoc(Trie(cs), value.key, value.value, depth + 1)
        }

        // resolve empty path - store them in a hashmap
        var cs = {}
        cs[key] = Value(key, val)
        cs[value.key] = value

        return Hashmap(cs)
    },
    hashmap: function(hashmap, key, val, depth){
        var v = copyAdd(hashmap.values, key, Value(key, val))
        return Hashmap(v)
    }
}

var copyDissoc = function(o, k){
    o = u.clone(o)
    delete o[k]
    return o
}

// dissoc :: node, path, key -> Trie
var dissoc = function(node, key, depth){
    return dissocFns[node.type](node, key, depth)
}

var dissocFns = {
    trie: function(trie, key, depth){
        var child = trie.children[hashMask(key, depth)]

        var t = child      === undefined                     ? trie
              : child.type === 'value' && child.key !== key  ? trie
              : child.type === 'value' && child.key === key  ? Trie(copyDissoc(trie.children, hashMask(key, depth)))
              :                                                Trie(copyAdd(trie.children, path[0], dissoc(child, key, hashMask(key, depth))))

        var keys = Object.keys(t.children)
        var child = t.children[keys[0]]

        if ( keys.length === 1 && child.type === 'value' ) return Value(child.key, child.value)
        else                                               return t
    },
    value: function(){},
    hashmap: function(map, key, depth){
        var ret = copyDissoc(map.values, hashMask(key, depth))
        var keys = Object.keys(ret)
        var child = ret[keys[0]]

        if ( keys.length === 1 ) return Value(child.key, child.value)
        else                     return Hashmap(ret)
    }
}


// transient :: node -> Object
var transient = function(node){
    return transientFns[node.type](node)
}

var transientFns = {
    trie: function(trie){
        var keys = Object.keys(trie.children)
        var vals = keys.map(function(key){
            return transient(trie.children[key])
        })
        if ( vals.length > 0 ) return vals.reduce(u.extend)
        else                   return {}
    },
    value: function(value){
        var o = {}
        o[value.key] = value.value
        return o
    },
    hashmap: function(hashmap){
        var keys = Object.keys(hashmap.values)
        var vals = keys.map(function(key){
            return transient(hashmap.values[key])
        })
        if ( vals.length > 0 ) return vals.reduce(u.extend)
        else                   return {}
    }
}



module.exports = {
    Trie    : Trie,
    Value   : Value,
    Hashmap : Hashmap,
    has     : has,
    get     : get,
    assoc   : assoc,
    dissoc  : dissoc,
    transient : transient
}
