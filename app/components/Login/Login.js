import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Keyboard,
	StatusBar
} from "react-native";

import { Actions } from "react-native-router-flux";

import styles from "./styles";

import config from "./../../config";

let MessageBarAlert = require('react-native-message-bar').MessageBar;
let MessageBarManager = require('react-native-message-bar').MessageBarManager;

class Login extends Component {
 	constructor(props) {
		super(props);
		this.baseUrl = config();
		this.state = {
			loading: false,
			textEmail: "Email",
			textPass: "Password"
		}
	}

	componentDidMount() {
		// Register the alert located on this master page
		// This MessageBar will be accessible from the current (same) component, and from its child component
		// The MessageBar is then declared only once, in your main component.
		MessageBarManager.registerMessageBar(this.refs.alert);
	}

	componentWillUnmount() {
		// Remove the alert located on this master page from the manager
		MessageBarManager.unregisterMessageBar();
	}

	submitButton() {
		this.setState({loading: true});
		let reqObj = {
			email: this.state.textEmail,
			password: this.state.textPass
		}
		fetch(this.baseUrl + "login", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		}).then((res) => {
			this.setState({loading: false});
			if (res.status === 200) {
				// The response object returned contains the object being sent
				// from the server, we need to call the function res.json() which will
				// return the json object being sent by the server.
				resObjPromise = res.json(); // returns a promise and is asynchronous
				// promise value is extracted using the .then function and the object
				// returned by the promise is used
				resObjPromise.then(function(resObj) {
					// We then pass the resObj as a property for the choise page
					Keyboard.dismiss();
					Actions.choice({resObj});
				})
			} else {
				MessageBarManager.showAlert({
					title: "Authentication Error",
					message: "Wrong username or password",
					alertType: "info",
						stylesheetInfo : {backgroundColor : 'transparent', strokeColor : '#828589',
						titleColor: '#000611', messageColor: '#000611'}
				});
			}

		}, (err) => {
			this.setState({loading: false});
			MessageBarManager.showAlert({
				title: "Connection Error",
				message: "Cannot connect to the internet",
				alertType: "info",
					stylesheetInfo : {backgroundColor : 'transparent', strokeColor : '#828589',
					titleColor: '#000611', messageColor: '#000611'}
			});
		});
	}

	registerButton() {
		Keyboard.dismiss();
		Actions.register({});
	}

	render() {
		return (
			<View style = {styles.container}>
				<StatusBar
		     backgroundColor="rgb(72, 110, 255)"
		     barStyle="light-content"
		   	/>
				<TextInput
					style = {styles.inputBox}
					placeholder = "Email"
         	underlineColorAndroid = "transparent"
					onChangeText = {(text) => this.setState({textEmail: text})}
				/>
				<TextInput
					style = {styles.inputBox}
					secureTextEntry = {true}
					placeholder = "Password"
					underlineColorAndroid = "transparent"
					onChangeText = {(text) => this.setState({textPass: text})}
				/>

				<TouchableOpacity onPress = {() => {this.submitButton()}} style = {{width: 300}}>
					<Text style = {styles.submitButtonOnLogin}> Login </Text>
				</TouchableOpacity>

				<View style = {styles.registerContainer}>
					<Text style={{fontFamily: 'sans-serif'}}>If not signed up then </Text><Text onPress = {this.registerButton} style = {{color: 'blue', fontFamily: 'sans-serif'}}>Register</Text>
				</View>

				<MessageBarAlert ref="alert" />

				{this.state.loading && <View style = {styles.loading}>
					<ActivityIndicator
						animating
						size="large"
					/>
				</View>}

			</View>
		);
	}
}

module.exports = Login;

AppRegistry.registerComponent("Login", () => Login);
