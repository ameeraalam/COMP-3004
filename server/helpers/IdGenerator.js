
class IdGenerator {

	constructor() {
		this.id = "";
	}

	generate(firstName, lastName, email) {
		// we reset the id attribute everytime the generate method is called
		this.id = "";
		for (let i = 0; i < firstName.length; ++i) {
			// Math.ceil because we want to round of the floating point number returned by Math.random
			let id = firstName.charCodeAt(i) * Math.ceil((Math.random() * 10));		
			// mod 127 to make sure that the integer does not exceed 127
			let str = String.fromCharCode(id % 127);
			this.id += str;
		}

		for (let i = 0; i < lastName.length; ++i) {
			let id = lastName.charCodeAt(i) * Math.ceil((Math.random() * 10));
			let str = String.fromCharCode(id % 127);
			this.id += str;
		}

		for (let i = 0; i < email.length; ++i) {
			let id = email.charCodeAt(i) * Math.ceil((Math.random() * 10));
			let str = String.fromCharCode(id % 127);
			this.id += str;
		}
	}

	retrieve() {
		return this.id;
	}

}

module.exports = IdGenerator;