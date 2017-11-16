"use strict"; // to enable ES6 syntax

let AbstractModel = require("./AbstractModel");

// This file will contain the blue print for the Ryde model

class RydeID extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
		this.collection = "RydeID";
	}
}

module.exports = RydeID;