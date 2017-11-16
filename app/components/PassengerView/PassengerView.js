import React, { Component } from 'react';
import { View, Text, AppRegistry,StatusBar } from "react-native";
import { Container, Header, Content, Icon, Left, Right, Button, Title, Body, TabHeading, Tab, Tabs, Fab } from 'native-base';
import Available from './Available';
import Pending from './Pending';
import Drawer from '../Drawer/Drawer';
import Notifications from '../Notifications/Notifications';


class PassengerView extends Component {

  constructor(props){
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
  }

  openNotifications(){
    this.notifications.openDrawer();
  }

  openMenu() {
    this.drawer.openDrawer();
  }


  render() {
    let resObj = this.props.resObj

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
            <Title style={{fontFamily: 'sans-serif'}}>DASHBOARD</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button onPress = {() => {this.openNotifications()}} transparent>
              <Icon name='notifications' />
            </Button>
          </Right>
        </Header>
        <Tabs initialPage={0} tabBarPosition='bottom' >
          <Tab heading={ <TabHeading style={{backgroundColor: 'rgb(72, 110, 255)'}}><Icon active name="checkmark-circle"/><Text style={{color:'white', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 10}}>Available</Text></TabHeading>}>
            <Available resObj={resObj} />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: 'rgb(72, 110, 255)'}}><Icon active name="time" /><Text style={{color:'white', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 10}}>Pending</Text></TabHeading>}>
            <Pending resObj={resObj} />
          </Tab>
        </Tabs>
      </Container>
    </Drawer>
  </Notifications>
    );
  }
}

module.exports = PassengerView;

AppRegistry.registerComponent("PassengerView", () => PassengerView);
