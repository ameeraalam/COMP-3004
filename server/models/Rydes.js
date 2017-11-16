"use strict"; // to enable ES6 syntax

let AbstractModel = require("./AbstractModel");

// This file will contain the blue print for the Ryde model

class Rydes extends AbstractModel {
	constructor() {
		super();
		// This is the collection that this model will deal with
		this.collection = "Rydes";
	}

	//used for updating arrays in collections
	updatePush(query, updatedFields, successCallBack, failureCallBack) {
		this.MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Failed to connect to the Ryde database...");
			} else {
				db.collection(this.collection).update(query, {$push: updatedFields}, (err, doc) => {
					if (err) {
						console.log("Error in updating the item in the Ryde database...");
						console.log(err);
						// check to see if a function is provided before calling it to prevent
						// calling an undefined variable
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						// check to see if a function is provided before calling it to prevent
						// calling an undefined variable
						console.log("Item is successfully updated in the Ryde database...");
						if (successCallBack) {
							successCallBack(doc);
						}
					}
					db.close();
				});
			}
		})
	}

}

module.exports = Rydes;