'use strict'

var routes = require('./controllers/routing.js')

function main() {
	routes()
}

if (!module.parent) {
	main();
}