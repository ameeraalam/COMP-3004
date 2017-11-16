import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";

import {
	Form,
	Item,
	Label,
	Input,
	ListItem,
	Header,
	Left,
	Body,
	Title,
	Button,
	Icon,
	Right,
	Picker,
	Item as FormItem
} from "native-base";

import { Actions } from "react-native-router-flux";
import Choice from "../Choice/Choice";
import styles from "./styles";
import config from "./../../config";
import DateTimePicker from 'react-native-modal-datetime-picker';
import OneSignal from 'react-native-onesignal';

class Register extends Component {

	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.onIds = this.onIds.bind(this);
		this.state = {
			deviceId: '',
			date: 'Date of Birth',
			isDateTimePickerVisible: false,
			firstName: "First name",
			lastName: "Last name",
			email: "Email",
			password: "password",
			dob: "Date of birth",
			phone: "Mobile phone number",
			gender: "Gender",

			firstNameS: {
				color: "grey"
			},

			lastNameS: {
				color: "grey"
			},

			emailS: {
				color: "grey"
			},

			passwordS: {
				color: "grey"
			},

			dobS: {
				color: "grey"
			},

			phoneS: {
				color: "grey"
			},

			genderS: {
				color: "grey"
			}
		}
	}


	componentWillMount() {
	  OneSignal.addEventListener('ids', this.onIds);
		OneSignal.configure();
	}

	componentWillUnmount() {
	    OneSignal.removeEventListener('ids', this.onIds);
	}

	onIds(device) {
		this.setState({deviceId: device.userId});
	}


	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
		let dateString = date.toString();
		let formattedDate = dateString.slice(3, 13);
		this.setState({date: formattedDate, dob: formattedDate, dobS: {color: "grey"}});
    	// console.log('Your Date of Birth is: ', date);
    	this._hideDateTimePicker();
  	}

	emailCheck() {
		let emailCheck = false;
		let checkObj = {at: false, dot: false, email: false};

		for (let i = 0; i < this.state.email.length; ++i) {
			// all the expression need to be true in order for the entire expression
			// to be true
			if (this.state.email[i] === "@") {
				checkObj.at = true;
				// if a letter is @ then the letter cannot be anything else again
				// therefore we continue the loop by skipping the if statement below
				continue;
			}

			if (this.state.email[i] === ".") {
				checkObj.dot = true;
			}

		}

		let emailObj = {email: this.state.email};

		// The fetch function call will return a promise and takes in two parameter
		// first is the url with which it makes a request and second parameter
		// is an object specifying the method details and the object that will
		// get sent. The promise being returned, gives back two call back functions
		// first contains one parameter which is the response object and the second
		// function contains one parameter which is the err.

		// the promise returned by the fetch function will be the return of the
		// .then function, so we are returning a promise
		return fetch(this.baseUrl + "emailCheck", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emailObj)
		}).then((res) => {
			// Since fetch is asynchronous that returns a promise, we want to do
			// all the checks after this async function returns the promise and so
			// we use the .then function and then do all the checks, because any check
			// outside the .then function will execute first before the async function
			// finishes
			if (res.status === 200) {
				checkObj.email = true;
				if (checkObj.at && checkObj.dot && checkObj.email) {
					// Initially emailCheck is false, not email check will result in
					// emailCheck being true
					emailCheck = !emailCheck;
				}
				return emailCheck;
			} else {
				return emailCheck;
			}
		}, (err) => {
			alert(err)
			return emailCheck;
		});
	}

	phoneCheck() {
		let phoneCheck = true;

		for (let i = 0; i < this.state.phone.length; ++i) {
			// Either of these expression being true will result in the statement eing true,
			// only if both the statements are false then the first half of the expression will be false.
			// Both the expression in the outer expresion need to be true in order for the entire expression to be true,
			// one of the expression being false will result in the entire statement being false.
			if ((this.state.phone.charCodeAt(i) < 48 || this.state.phone.charCodeAt(i) > 57) && this.state.phone.charCodeAt(i) !== 43) {
				phoneCheck = false;
			}
		}

		return phoneCheck;
	}

	firstNameChecker() {
		if (this.state.firstName.length === 0) {
			return false;
		}
		return true;
	}

	lastNameChecker() {
		if (this.state.lastName.length === 0) {
			return false;
		}
		return true;
	}

	submitButton() {
		let errors = [];

		let emailCheck = this.emailCheck();

		emailCheck.then((val) => {

			if (val === false) {
				this.setState({emailS: {color: "red"}});
				errors.push("email");
			} else {
				this.setState({emailS: {color: "grey"}});
			}

			let phoneCheck = this.phoneCheck();

			if (phoneCheck === false) {
				this.setState({phoneS: {color: "red"}})
				errors.push("phone");
			} else {
				this.setState({phoneS: {color: "grey"}});
			}

			if (this.firstNameChecker() === false) {
				this.setState({firstNameS: {color: "red"}});
				errors.push("firstName");
			} else {
				this.setState({firstNameS: {color: "grey"}})
			}

			if (this.lastNameChecker() == false) {
				this.setState({lastNameS: {color: "red"}});
				errors.push("lastName");
			} else {
				this.setState({lastNameS: {color: "grey"}});
			}

			let reqObj = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				dob: this.state.dob,
				phone: this.state.phone,
				gender: this.state.gender,
				plate: '',
				liscense: '',
				car: '',
				allInfoFilled: false,
				deviceId: this.state.deviceId
			}

			// I want to send the object only if there are no errors
			if (errors.length === 0) {
				// The fetch function call will return a promise and takes in two parameter
				// first is the url with which it makes a request and second parameter
				// is an object specifying the method details and the object that will
				// get sent. The promise being returned, gives back two call back functions
				// first contains one parameter which is the response object and the second
				// function contains one parameter which is the err.
				fetch(this.baseUrl + "register", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(reqObj)
				}).then((res) => {
					if (res.status === 200) {
						// on completing the registration we create the personal rydes object which
						// every user will have
						// we send the email address using the query string
						fetch(this.baseUrl + this.state.email + "/createPersonalRyde", {
							method: "GET"
						// res means response object
						}).then((res) => {
							if (res.status === 200) {
								alert("Registration complete"); // should be changed to a message bar
								// on completing the registration we switch to the login page
								Actions.login({type: 'reset'});
							} else {
								alert("Error");
							}
						// err means the error returned from the promise
						}, (err) => {
							alert("Server error")

						});
					} else {
						alert("Error");
					}
				}, (err) => {
					alert("Server error");
				});
			}

		})

	}


	render() {
		return (
			<ScrollView style={{backgroundColor: '#fff'}}>
				<Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
					<Body>
						<Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>REGISTER</Title>
					</Body>
				</Header>

				<View style={{ marginTop:30, paddingLeft:15}}>
					<Text style={{fontSize: 40, fontFamily: 'sans-serif', color: 'rgb(72, 110, 255)'}}>
						Register
					</Text>
				</View>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.firstNameS}>First name</Label>
						<Input
							onChangeText = {(text) => this.setState({firstName: text, firstNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.lastNameS}>Last name</Label>
						<Input
							onChangeText = {(text) => this.setState({lastName: text, lastNameS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form>
					<Item floatingLabel>
						<Label style = {this.state.emailS}>Email</Label>
						<Input
							onChangeText = {(text) => this.setState({email: text, emailS: {color: "grey"}})}
						/>
					</Item>
				</Form>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.passwordS}>Password</Label>
						<Input
							secureTextEntry = {true}
							onChangeText = {(text) => this.setState({password: text, passwordS: {color: "grey"}})}

						/>
					</Item>
				</Form>

				<ListItem icon style={{marginTop:28}} onPress={this._showDateTimePicker}>
					<Body>
						<Text style={{fontSize: 16}}>{this.state.date}</Text>
					</Body>
				</ListItem>
				<DateTimePicker
         			isVisible={this.state.isDateTimePickerVisible}
          			onConfirm={this._handleDatePicked}
          			onCancel={this._hideDateTimePicker}
        		/>

				<Form>
					<Item floatingLabel>
						<Label style = {this.state.phoneS}>Phone number</Label>
						<Input
							onChangeText = {(text) => this.setState({phone: text, phoneS: {color: "grey"}})}
						/>
					</Item>
				</Form>


				<Form style={{paddingLeft:15, marginTop:28, marginBottom: 28}}>
					<Picker
						mode="dropdown"
						placeholder="Gender"
						selectedValue={this.state.gender}
						onValueChange={(value) => this.setState({gender: value, genderS: {color: "black"}})}
					>
						<Item label="Gender" value="gender" />
						<Item label="Male" value="male" />
						<Item label="Female" value="female" />
					</Picker>
				</Form>

				<View style = {{marginTop: 15, marginBottom: 30, paddingLeft: 15, paddingRight: 15}}>
					<TouchableOpacity onPress = {() => {this.submitButton()}}>
						<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:60, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
							Register
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		);
	}
}

module.exports = Register;

AppRegistry.registerComponent("Register", () => Register);
