"use strict";

let AbstractModel = require("./AbstractModel.js");

// this class is responsible for the Users collection in the Ryde mongodb database
class Users extends AbstractModel {
	constructor() {
		super();
		// this is the collection that this model will deal with
		this.collection = "Users";
	}
}

module.exports = Users;