'use strict'

var log = console.log.bind(console)

var print = function(){
	log('')
	log(this.name)
	log('//-------------------------//')
	log('Results:')
	
	this.map(function(results){
		log(results.name + ' : ' + results.count + ' ± ' + results.stats.rme + '%')
	})
	log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
}

module.exports = print