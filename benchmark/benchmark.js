'use strict'

var run = require('./run-suite')

var suites = [
	require('./assoc-1'),
	require('./dissoc-1'),
	require('./get-1'),
	require('./has-1'),
	require('./transient-1')
]

suites.forEach(run)