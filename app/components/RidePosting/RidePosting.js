// Imports required for this page
import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Alert,
	TextInput,
	TouchableOpacity
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';

<<<<<<< HEAD
import config from "./../../config";
import { Container, Header, Left, Icon, Body, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';

// Unique static ID that will be assigned to a Ryde each time one is created
var rideNum = 1;
=======
// Unique static ID that will be assigned to a Ryde each time one is created
var rideID = 1;
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
var emptyArray = [];

// Main class
class RidePosting extends Component{

	constructor(props){
		super(props);
<<<<<<< HEAD
		this.address = config.ip;
=======
		this.address = "172.17.137.0";
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
		this.baseUrl = "http://" + this.address + ":3000/";
		this.state = {
			fromLocation: "From:",
			toLocation: "To:",
			travelDate: "Date: (DD/MM)",
			numPassengers: "Passenger Spots:",
<<<<<<< HEAD
			numLuggage: "Luggage Space:",
			ridePrice: "Price per seat:"
		}
	}


	// MAKE INPUTS LOWERCASE FOR ROBUSTNESS WHEN SEARCHING
	// Code for functionality of the Post button on the app page
	postButton(){
		
		let resObj = this.props.resObj;

		let reqObj = {
			driver: this.props.resObj.email,
=======
			numLuggage: "Luggage Space:"
		} 
	}

	// Code for functionality of the Post button on the app page
	postButton(){
		
		// need to pass Ryde ID here
		// MAKE INPUTS LOWERCASE FOR ROBUSTNESS WHEN SEARCHING
		let reqObj = {
			driver: "this@email.com", // this.props.resObj.email, 
			from: this.state.fromLocation,
			to: this.state.toLocation,
			date: this.state.travelDate,
			numPassengers: this.state.numPassengers,
			numLuggage: this.state.numLuggage,
			rideId: rideNum,// Needs to become a server side variable
			pending: emptyArray,
			members: emptyArray,
			currentPassengerCount: 0,
			currentLuggageCount: 0,
			price: "$" + this.state.ridePrice,
			rideNum: rideID,
			pending: emptyArray,
			members: emptyArray,
			currentPassengerCount: 0,
			currentLuggageCount: 0
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
		}

		fetch(this.baseUrl + "postRyde",{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)

		}).then((res) => {
			
			if (res.status === 200){

				rideID++;
				alert("Ryde Posted!");
				// Need to pass user Obj here
<<<<<<< HEAD
				Actions.driverview({resObj});
			} else {
				
				alert("Server Error!!!!!");
=======
				Actions.driverView({});
			} else {
				
				alert("Server Error!");
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
			}
		}, (err) => {

			alert("Server Error!");
		});
	}

	// App visuals
	render(){
		
		return(
			
			<View style = {styles.mainStyle}>
				
				{/*Instruction Text*/}
				<Text style = {styles.welcome}>
					Post Your Ryde
				</Text>

				{/*Input box for the from location*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.fromLocation}
					onChangeText = {(text) => this.setState({fromLocation: text})}
				/>
				
				{/*Input box for the to location*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.toLocation}
					onChangeText = {(text) => this.setState({toLocation: text})}
				/>
				
				{/*Input box for the travel date*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.travelDate}
					onChangeText = {(text) => this.setState({travelDate: text})}
				/>
				
				{/*Input box for the number of passengers*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.numPassengers}
					onChangeText = {(text) => this.setState({numPassengers: text})}
				/>
				
				{/*Input box for the amount of luggage*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.numLuggage}
					onChangeText = {(text) => this.setState({numLuggage: text})}
				/>
<<<<<<< HEAD

				{/*Input box for the price of each seat*/}
				<TextInput
					style = {styles.inputBox}
					placeholder = {this.state.ridePrice}
					onChangeText = {(text) => this.setState({ridePrice: text})}
				/>
=======
>>>>>>> 295fd4106d74e34188b37ecaef0844e37149bd46
				
				{/*Button to use the postButton function with an image being used for the button*/}
				<TouchableOpacity onPress = {() => {this.postButton()}}>
					<Image
						source = {require("./images/postImage.jpg")}
					/>
				</TouchableOpacity>
			
			</View>
		);
	}
}


// Styling
const styles = StyleSheet.create({
  	
  	mainStyle: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: '#FFFFFF',
  	},

  	inputBox: {
  		height: 40,
  		width: 200,
  		borderColor: '#000000',
  		borderWidth: 1
  	},
 	
 	welcome: {
    	fontSize: 20,
    	textAlign: 'center',
    	margin: 10,
    	color: '#000000',
  	},
  	
  	instructions: {
    	textAlign: 'center',
    	color: '#FFFFFF',
    	marginBottom: 5,
  	},
});

module.exports = RidePosting;
AppRegistry.registerComponent("RidePosting", () => RidePosting);