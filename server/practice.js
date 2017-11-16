"use strict"

var MongoClient = require("mongodb").MongoClient;

function main() {

	var user = {
		rydes: []
	}

	var ryde = {
		members: []
	}

	for (var i = 0; i < 10; ++i) {
		ryde.members.push(user);
	}

	for (var i = 0; i < 10; ++i) {
		user.rydes.push(ryde);
	}


	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err) console.log(err);
		else {
			db.collection("users").insert(ryde);
		}
	})

}

if (!module.parent) {
	main();
}