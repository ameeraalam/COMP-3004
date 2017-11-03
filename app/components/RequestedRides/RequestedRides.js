/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView,
	TouchableOpacity
} from "react-native";

import {  
	View,  
	Card, 
	CardItem,  
	Text,
	Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import config from "./../../config";

import Swipeout from "react-native-swipe-out";

import CardSlide from "./CardSlide";

class RequestedRides extends Component {
	constructor(props) {
		super(props);
		this.address = config.ip;
		//this.user = this.props.resObj;
		// database is queryed with the driver's email and the database that is
		// queried is PersonalRydes database
		this.user = {email: "ameeraalam13@hotmail.com"};
		this.baseUrl = "http://" + this.address + ":3000/";
		this.swipeOutButtons = [{
			text: "Accept",
			backgroundColor: "#86e079",
			onPress: () => {this.acceptPassenger()}
		}, {
			text: "Reject",
			backgroundColor: "#e54747",
			onPress: () => {this.rejectPassenger()}
		}];
		this.state = {
			pendingPassengers: []
		}
		this.passengerIndex = 0;
		this.getPassengerRequests();
	}

	// we query to get the passengers who have applied to our rydes
	getPassengerRequests() {
		// we sent a query string to the server with the email of the driver
		fetch(this.baseUrl + this.user.email + "/getPassengerRequests", {
			method: "GET"
		}).then((res) => {
			// response object being returned
			if (res.status === 200) {
				resPromise = res.json();
				resPromise.then((resObj) => {
				// the response object will look something like this:
				// resObj = {"1": [firstName: "Brian", lastName: "West", email: "brianwest@ryde.com", dob: "12/12/1994", phone: "615897446", …], "2": [], "3": []}
				// where "1", "2", "3" are the keys of the object which are the id's of the different rydes posted by the driver
				let rydeKeys = Object.keys(resObj);

				// rydeKeys will be an array of keys in the resObj

				// what we do here is we obtain all the keys of the response object and put it in an array
				// after that we populate the pending passengers using these information

				// this.state.pendingPassengers will be set to this value after the loop
				let passengers = [];
				for (let i = 0; i < rydeKeys.length; ++i) {
					// we extract the array containing all the passengers of a specific ryde
					let requestsPerRydeObject = resObj[rydeKeys[i]];

					// we loop over the requestsPerRydeObject array and append it to the state making a slidable card
					for (let j = 0; j < requestsPerRydeObject.length; ++j) {
						passengers.push(
							// each card will get the latest index
							<CardSlide cardIndex = {passengers.length - 1} getIndex = {this.getIndex} acceptPassenger = {this.acceptPassenger} rejectPassenger = {this.rejectPassenger} id = {rydeKeys[i]} firstName = {requestsPerRydeObject[j].firstName} lastName = {requestsPerRydeObject[j].lastName} rating = {requestsPerRydeObject[j].rating} />
						);
					}
				}
				this.setState({pendingPassengers: passengers});
				}, (err) => {
					alert("Promise error");
				});
			} else {
				alert("Server error");
			}
		}, (err) => {
			alert("Promise error");
		});
	}


	acceptPassenger() {


	}


	rejectPassenger() {



	}

	getIndex() {

	}

	render() {
		return(
			<ScrollView>
				{this.state.pendingPassengers}
			</ScrollView>
		);
	}
}

module.exports = RequestedRides;

AppRegistry.registerComponent("RequestedRides", () => RequestedRides);