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
import { Container, Header, Left, Icon, Body, Right, Card, CardItem, Title, Footer, FooterTab, Content, List, ListItem } from 'native-base';
import config from "./../../config";

class RideBrowser extends Component{

    constructor(props){
        super(props);
        this.address = config.ip;
        this.baseUrl = "http://" + this.address + ":3000/";
        this.state = {rydes: []}
    }

    componentDidMount(){
        this.loadRydes();
    }

    loadRydes(){

        let allRydes = [];
        let currentPassenger = this.props.passedResObj;
        let currentRyde = null;
        let indexCount = 0;
        let rydeForButton = [];

        for (let i = 0; i < this.props.resObj.dest.length;  i++){

            currentRyde = this.props.resObj.dest[i];
            rydeForButton.push(currentRyde);
            let resObjRyde = rydeForButton[indexCount];

            allRydes.push(
                <View key={i}>
                    <CardItem button onPress={() => Actions.passengerSearchProfile({currentPassenger, resObjRyde})}>
                    <Body>
                    <Text>Driver: {currentRyde.firstName + " " + currentRyde.lastName}</Text>
                    <Text>Price: {currentRyde.price}</Text>
                    </Body>
                    </CardItem>
                </View>
            );

            indexCount++;
        }

        this.setState({rydes: allRydes});
    }

	render(){

		return(

		    <View>
		        {this.state.rydes}
			</View>
		);
	}
}

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

  	myImage: {
  		justifyContent: 'center',
  		alignItems: 'center'
  	}
});

module.exports = RideBrowser;
AppRegistry.registerComponent("RideBrowser", () => RideBrowser);
