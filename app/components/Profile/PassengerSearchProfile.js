import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import {Container, Header, Left, Right, Body, Button, Title, Content, Footer, Icon, CardItem} from 'native-base';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';
import config from "./../../config";

//page you will link to when you search for rides as a passenger and click on a ride you are interested in. make sure to send both the ride and passenger obj.
class PassengerSearchProfile extends Component {
  constructor(props){
    super(props);
    this.baseUrl = config();
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }


  requestButton(){
    let resObj = this.props.resObjRyde;
    let reqObj = {

      myRes: this.props.currentPassenger,
      driverRes: this.props.resObjRyde
    }

    fetch(this.baseUrl + "passengerSearch", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqObj)
    }).then((res) => {
      if (res.status === 200) {
        let resObj = this.props.currentPassenger;
        //if request is succesfully sent then we alert the user
        alert("Request succesfully sent.")
        Actions.passengerView({resObj});
      } else {
        alert("Can't send a request twice."); // not added here
      }
    }, (err) => {
      if (err) {
        alert("Cannot request");
      }
    });
  }

  render() {

    return (
      <Notifications
        ref={(notifications) => (this.notifications = notifications)}>
        <Drawer
          ref={(drawer) => this.drawer = drawer}>
          <Container>
            <Header style={{backgroundColor: 'rgb(72, 110, 255)'}}>
              <Left style={{flex: 1}}>
                <Button transparent onPress={this.openMenu}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body style={{alignItems: 'center', flex: 1}}>
                <Title style={{fontFamily: 'sans-serif'}}>RYDE INFO</Title>
              </Body>
              <Right style={{flex: 1}}>
                <Button onPress = {() => {this.openNotifications()}} transparent>
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
            <ScrollView>
              <Content>
                <Image
                  style={{
                    width: 160,
                    borderRadius: 80,
                    height: 160,
                    alignItems: 'center'
                  }}
                  source={require('../Profile/Images/profilepic.jpg')}
                  />

                <CardItem>
                  <Text>Driver E-mail: {this.props.resObjRyde.driver}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Rating: {this.props.resObjRyde.rating}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Luggage: {this.props.resObjRyde.numLuggage} </Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Passengers: {this.props.resObjRyde.numPassengers}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>Price: {this.props.resObjRyde.price}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>From: {this.props.resObjRyde.from}</Text>
                </CardItem>
                <Text></Text>
                <CardItem>
                  <Text>To: {this.props.resObjRyde.to}</Text>
                </CardItem>
                <Text></Text>
              </Content>
            </ScrollView>
            <View>
              <Button large style={styles.button} onPress={() => this.requestButton()}><Text style={styles.text}>Request</Text></Button>
            </View>
          </Container>
        </Drawer>
      </Notifications>

    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom:16
  },

  button: {
    position: 'absolute',
    bottom:20,
    right:15,
  },

  viewmap: {
    position: 'absolute',
    bottom: 20,
    left: 15
  },

  chat: {
    position: 'absolute',
    bottom: 20,
    right: 170
  }
});
module.exports = PassengerSearchProfile;

AppRegistry.registerComponent('PassengerSearchProfile', () => PassengerSearchProfile);
