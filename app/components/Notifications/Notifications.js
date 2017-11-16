import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, DrawerLayoutAndroid, Image } from 'react-native';
import { Container, Header, Title, Left, Icon, Text, Right, Button, Center, Footer, FooterTab,
          Body, Content, Card, CardItem, Grid, Row, Col, List, ListItem, Switch } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.notifications.openDrawer();
  }


  render() {
    var navigationView = (
      <Container>
        <Header style={styles.navBar}>
          <View style={styles.navbarContainer}>
            <Text style={styles.navBarTitle}>Notifications</Text>
          </View>
        </Header>
      </Container>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(notifications) => (this.notifications = notifications)}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        drawerLockMode='locked-closed'
        renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    );

  }

}

module.exports = Notifications;

AppRegistry.registerComponent('Notifications', () => Notifications);
