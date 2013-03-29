'use strict'

var run = require('./run-suite')
var _ = require('lodash')

var assoc = require('./assoc')
var dissoc = require('./dissoc')
var has = require('./has')
var get = require('./get')
var mutable = require('./mutable')

var suites = [
	assoc(1),
	assoc(10),
	assoc(100),
	assoc(1000),


	dissoc(1),
	dissoc(10),
	dissoc(100),
	dissoc(1000),

	has(1),
	has(10),
	has(100),
	has(1000),

	get(1),
	get(10),
	get(100),
	get(1000),

	mutable(1),
	mutable(10),
	mutable(100),
	mutable(1000)
]

_.each(suites, run)
