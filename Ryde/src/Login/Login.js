import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

import styles from "./styles";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			textEmail: "Email",
			textPass: "Password"
		}
	}

	submitButton() {
		Actions.home({});
	}


	render() {
		return (
			<View style = {styles.container}>
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
					onChangeText = {(text) => this.setState({textPass: text})}
				/>

				<TouchableOpacity onPress = {() => {this.submitButton()}} style = {{width: 300}}>
					<Text style = {styles.submitButtonOnLogin}> Login </Text>
				</TouchableOpacity>

				<View style = {styles.registerContainer}>
					<Text style={{fontFamily: 'sans-serif'}}>If not signed up then </Text><Text onPress = {this.registerButton} style = {{color: 'blue', fontFamily: 'sans-serif'}}>Register</Text>
				</View>

			</View>
		);
	}
}

module.exports = Login;
AppRegistry.registerComponent("Login", () => Login);
