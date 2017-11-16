/* Author: Md. Tanvir Islam */

import React, { Component } from "react";

import {
	AppRegistry,
	ScrollView
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

import Swipeout from "react-native-swipeout";

class CardSlide extends Component {
	constructor(props) {
		super(props);
		this.swipeOutButtons = [{
			text: "Accept",
			backgroundColor: "#86e079",
			// we pass the child's this to the parent's acceptPassenger function
			// so the parent's acceptPassenger scoped function can manipulate the child's props
			onPress: () => {this.props.acceptPassenger(this)}
		}, {
			text: "Reject",
			backgroundColor: "#e54747",
			onPress: () => {this.props.rejectPassenger(this)}
		}];
	}

	render() {
		return(
			<Swipeout right = {this.swipeOutButtons} autoClose = {true}>
					<Card>
						<CardItem>
							<Text>RydeId: {this.props.rydeId} First Name: {this.props.firstName} Last Name: {this.props.lastName}, Email: {this.props.email}, Rating: {this.props.rating}</Text>
						</CardItem>
					</Card>
			</Swipeout>
		);
	}
}

module.exports = CardSlide;

AppRegistry.registerComponent("CardSlide", () => CardSlide);