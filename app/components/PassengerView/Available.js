import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import { Container, Header, Left, Right, Icon, Body, Button, Title, Footer, FooterTab, Content, List, CardItem, Fab } from 'native-base';
//this is the main passenger view page. the default page will be available and you can see all the rides you have been accepted in to as a passenger
//when you click on a ride, you get redirected to the PassengerAvailableRideProfile. Here I send both the driver object and passenger object

import config from "./../../config";

class Available extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.state = {
      data: []
    }
  }


  findButton(){
    let resObj = this.props.resObj;
    Actions.rideSearch({resObj});
  }


  retrieveAvailablePosts(){

    return fetch(this.baseUrl + this.props.resObj.email + '/available', {
      method: "GET"
    })
    .then((response) => {
      if(response.status === 200) {
        resObjPromise = response.json();

        resObjPromise.then((resObj) => {
          //alert(JSON.stringify(resObj));
          dataSet = [];
          for(let i=0;i<resObj.length;i++){
            let resO = resObj[i]; //driver object
            let myRes = this.props.resObj; //passenger object
            dataSet.push(
              <View key={i}>
                <CardItem button onPress={()=>
                  Actions.availableProfile({resO, myRes})}>
                  <Body>
                    <Text>From: {resObj[i].from}</Text>
                    <Text>To: {resObj[i].to}</Text>
                    <Text>Date: {resObj[i].date}</Text>
                    <Text style={{left: 320}}>Price: ${resObj[i].price}</Text>
                  </Body>
                </CardItem>
                <Text></Text>
              </View>
            )
          }
          this.setState({data: dataSet})
        })
      }

        else { alert('You do not have any available requests');
        }
      }, (err) => {
        alert(err)
      });
    }

    componentDidMount(){
      this.retrieveAvailablePosts();
    }

    render() {
      let resObj = this.props.resObj;

      return (
        <Container>
          <Content>
            {this.state.data}
          </Content>
          <View>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: 'rgb(72, 110, 255)' }}
              position="bottomRight"
              onPress={() => {this.findButton()}}>
              <Icon name="search" />
            </Fab>
          </View>
        </Container>

      );
    }
  }

  module.exports = Available;

  AppRegistry.registerComponent('Available', () => Available);
