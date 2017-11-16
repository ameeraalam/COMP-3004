import React, { Component } from "react";
import Main from "./components/Main/Main"
import {
	AppRegistry,
} from "react-native";

class Ryde extends Component {
	render() {
		return (
			<Main/>
		);
	}
}

module.exports = Ryde;

AppRegistry.registerComponent("Ryde", () => Ryde);
