'use strict'

var run = require('./run-suite')
var _ = require('lodash')

var suites = [
	require('./assoc-1'),
	require('./dissoc-1'),
	require('./get-1'),
	require('./has-1'),
	require('./transient-1'),

	require('./assoc-10'),
	require('./dissoc-10'),
	require('./get-10'),
	require('./has-10'),
	require('./transient-10'),
]

_.each(suites, run)