// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('Ryde', () => App);

// import renderer from 'react-test-renderer';
//
// it('renders without crashing', () => {
//   const rendered = renderer.create(<App />).toJSON();
//   expect(rendered).toBeTruthy();



import React, { Component } from "react";
import Main from "./src/Main/Main"
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
