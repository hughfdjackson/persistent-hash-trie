//# Hashing functions

// Int, Int -> Int
// gets a <= 5 bit section of a hash, shifted from the left position
// in practice, a 32 bit splits into 7 chunks - 6 of 5 bits, one of 2
var mask = function(hash, from){ return (hash >>> from) & 0x01f }

// String, Int, Function -> Int
// gets a chunk of a hash, given a string and a hashing function
// the hashing function should return a 32 bit hash.
var hashMask = function(str, from, hash){
    return mask(hash(str), from)
}

// hash function for strings, based on Java's String.hashCode:
// http://docs.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#hashCode()
var hash = function(str){
    var h = 0
    var l = str.length
    for ( var i = 0; i < l; i += 1 )
        h = h * 31 + str.charCodeAt(i)
    return h
}

module.exports = {
	hash: hash,
	mask: hashMask
}
