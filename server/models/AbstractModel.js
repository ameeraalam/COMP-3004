"use strict";

/*
	NOTE** - The reason that the successCallBack and failureCallBack will work and can
	successfully access the variables is because the class Users has a composition relationship
	with the Controller, this means that because of lexical scoping the Users class can access
	the variables scoped within the Controller class. I am specifying this to remind you that
	the function that invokes has to supply all the variables and resources for the function being
	passed on to do the job!

*/

class AbstractModel {

	constructor() {
		this.MongoClient = require("mongodb").MongoClient;
		// this variable holds the mongodb database address
		this.db = "mongodb://admin:ryde1234@ds141175.mlab.com:41175/ryde";
		// the class extending this abstract class will define their own collection
		this.collection = "";

		// to prevent AbstractModel class from being instantiated
		if (this.constructor === AbstractModel) {
			// The TypeError object represents an error when a value is not of the expected type.
			throw new TypeError("AbstractModel is an abstract class and cannot be instantiated");
		}
	}

	insert(query, successCallBack, failureCallBack) {
		this.MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Error in finding the item in the Ryde database...");
			} else {
				db.collection(this.collection).insert(query, (err, doc) => {
					if (err) {
						console.log("Error in inserting the object in the Ryde database...")
						console.log(err);
						// this if statement is needed because we need to make sure that
						// we invoke the callback function only if the call back function is provided
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						console.log("Item is successfully added to the Ryde database...")
						// this if statement is needed becauase we need to make sure
						// we invoke the callback function only if the call back function is provided
						if (successCallBack) {
							// the successCallBack will take the mongodb doc object
							// the call back function provided by the scope that will have this model object
							// will provide the logic with how you would like to deal with the doc, all this
							// function is responsible in this scope is calling that function wherer the logic
							// is provided from another scope
							successCallBack(doc);
						}
					}
					db.close();
				})
			}
		})
	}

	// updated fields is an object containing all the partial updated attributes
	update(query, updatedFields, successCallBack, failureCallBack) {
		this.MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Failed to connect to the Ryde database...");
			} else {
				db.collection(this.collection).update(query, {$set: updatedFields}, (err, result) => {
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
							this.query(query, (doc) => {
								successCallBack(doc);
							}, () => {
								if (failureCallBack) {
									failureCallBack();
								}
							})
						}
					}
					db.close();
				});
			}
		})
	}

	remove(query, successCallBack, failureCallBack) {
		this.MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Failed to connect to the Ryde database...");
			} else {
				db.collection(this.collection).remove(query, (err, doc) => {
					if (err) {
						console.log("Error in deleting item in the Ryde database");
						console.log(err);
						// undefined parameter variable check
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						// undefined parameter variable check
						if (successCallBack) {
							successCallBack(doc);
						}
					}
				});
			}
		});
	}

	query(query, successCallBack, failureCallBack) {
		this.MongoClient.connect(this.db, (err, db) => {
			if (err) {
				console.log("Failed to connect to the Ryde database...");
			} else {
				db.collection(this.collection).findOne(query, (err, doc) => {
					if (err) {
						console.log("Error in finding the item in the Ryde database...");
						console.log(err);
						// we check if a failureCallBack is provided by the scope which is using this
						// object's function, if it is we invoke the function
						if (failureCallBack) {
							failureCallBack();
						}
					} else {
						// doc will be returned as null if mongodb can't find an object
						// with the query specified
						if (doc === null) {
							// gain we only call the callback function if and only if it is provided
							// if it is not provided failureCallBack will be null
							if (failureCallBack) {
								failureCallBack();
							}
						} else {
							if (successCallBack) {
								// the successCallBack will take the mongodb doc object as a param
								// and this param will get supplied to the function and the logic with
								// what the function will do with the object will be provided by the scope
								// in which this model object is contained in
								successCallBack(doc);
							}
						}
					}
					// we close the database after we are done with all the interactions
					// this has to be within the function because if its not within the function
					// the db will always get closed before the function itself is invoked as
					// all mongodb functions are asynchronous
					db.close();
				});
			}
		});
	}


	findAll(query, successCallBack, failureCallBack) {
		return this.MongoClient.connect(this.db, (err, db) => {

			if (err){
				console.log("Failed...");
				if (failureCallBack){
					failureCallBack();
				}
			} else {

				var cursor = db.collection(this.collection).find(query);
				 if (successCallBack){
				 	successCallBack(cursor);
				 }
			}

			db.close();

		});
	}


	updatePush(query, updatedFields, successCallBack, failureCallBack) {
		// To be defined in subclasses
	}


}

module.exports = AbstractModel;
