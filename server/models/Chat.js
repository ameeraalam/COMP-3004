"use strict"; // to enable ES6 syntax

let AbstractModel = require("./AbstractModel.js");

// This file will contain the blue print for the chat model, which will be used to
// interact with the MongoDB collection called Chat, which holds all the chat messages of individual rides.

class Chat extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
		this.collection = "Chat";
	}
}

module.exports = Chat;