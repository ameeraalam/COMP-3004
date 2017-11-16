"use strict";

var Controller = require('./Controller.js');

module.exports = function() {
	/* Routing dependencies */
	var express = require('express');
	var bodyParser = require('body-parser');
	var Controller = require('./Controller.js');

	const CONTROLLER = new Controller();
	const ROOT = './';

	/* Express object created */
	var app = express();

	app.set("port", (process.env.PORT || 3000));
	app.use(express.static(ROOT));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(function(req, res, next) {
		console.log(req.method + ' request for: ' + req.url);
		next(); // next without parameter simply invokes the next route in the file
	});

	/* Socket io configuration */
	let server = require("http").createServer(app)
	var io = require("socket.io")(server);

	/* Routings */

	app.post("/login", (req, res) => { CONTROLLER.login(req, res); });

	app.post("/register", (req, res) => { CONTROLLER.register(req, res); });

	app.post("/emailCheck", (req, res) => { CONTROLLER.emailCheck(req, res); });

	app.post("/driverInfo", (req, res) => { CONTROLLER.driverInfo(req, res); });

	app.post("/storeChat", (req, res) => { CONTROLLER.storeChat(req, res); });

	app.get("/:email/createPersonalRyde", (req, res) => { CONTROLLER.createPersonalRyde(req, res); })

	app.post("/:email/getPassengerRequests", (req, res) => { CONTROLLER.getPassengerRequests(req, res); });

	app.post("/:email/acceptedUpdatedRydes", (req, res) => { CONTROLLER.acceptedUpdatedRydes(req, res); })

	app.post("/:email/rejectedUpdatedRydes", (req, res) => { CONTROLLER.rejectedUpdatedRydes(req, res); });

	app.post("/postRyde", (req, res) => { CONTROLLER.postRyde(req, res); });

	app.post("/findRyde", (req, res) => { CONTROLLER.findRyde(req, res); });

	app.post("/incrementRydeID", (req, res) => { CONTROLLER.incrementRydeID(req, res); });

	app.post("/getRydeID", (req, res) => {CONTROLLER.getRydeID(req, res); });

	app.get("/:email/driverView", (req,res) => { CONTROLLER.driverView(req,res); });

	app.get("/:email/pending", (req,res) => {CONTROLLER.pending(req,res); });

	app.get("/:email/available", (req,res) => {CONTROLLER.available(req,res); });

	app.post("/passengerSearch", (req, res) => {CONTROLLER.passengerSearch(req,res); })


	// Error get request must always be processed at the very end after all options
	// have been exhausting in resolving the request. This happens because of the
	// next() middleware being used
	app.get('*', (req, res) => { CONTROLLER.err(req, res); });

	app.post("*", (req, res) => { CONTROLLER.err(req, res); });

	/* Socket Routing */

	io.on("connection", (socket) => {
		CONTROLLER.connection(socket);

		// CONTROLLER.idEnquiry returns a promise that we need to resolve
		CONTROLLER.idEnquiry(socket).then((id) => {

			CONTROLLER.initMessages(socket, id);

			CONTROLLER.storeChat(io, socket, id);
		});

	});


	// The compiler probably uses a queue datastructure to handle the functions responsible
	// for requests. Where it is in the first in first served (FIFO) based algorithm. All the functions
	// are asynchronous, for example if a request function had an asynchrounous call setTimeout() inside it
	// the request function itself would get pushed down the queue for the next index of the queue to be handled
	// now and as the timeout is resolving it will keep bubbling up the queue. Remember asynchronous functions will
	// always be the last thing to get invoked when non asynchronous functions are invoked.

	// Functions like setTimeout pushes the funciton down the function execution queue.

	server.listen(app.get("port"), CONTROLLER.intro());

//	server.listen(4000, CONTROLLER.socketIntro());

}
