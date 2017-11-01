import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, DrawerLayoutAndroid, Image } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Text, Button, Center, Footer, FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
import styles from './styles';

class Home extends Component {

  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  render() {
    var navigationView = (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'rgb(72, 110, 255)', alignItems:'center'}}>
          <Image style={{height:90, width: 90, borderRadius: 64, marginTop:30}}
          source={require('./images/user_placeholder.png') } />
          <Text style={{color:'#fff', fontSize:20, marginTop:20, fontFamily: 'sans-serif'}}>Brian West</Text>

          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Image style={{height:15, width: 15, marginTop:6}}
            source={require('./images/star.png') }/>

            <Text style={{color:'#fff', marginTop:5.5, fontSize:14, marginLeft:2, fontFamily: 'sans-serif'}}> 4.21 </Text>
          </View>
        </View>

        <View style={{flex: 2, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontFamily: 'sans-serif'}}>Will get done today</Text>
        </View>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={_drawer => (this.drawer = _drawer)}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerLockMode='locked-closed'
        renderNavigationView={() => navigationView}>

      <Container>
        <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>Home</Title>
          </Body>

          <Right style={{flex: 1}}/>
        </Header>

        <Content style={{backgroundColor:'#fff'}}>
          <Text style={{fontFamily: 'sans-serif'}}>
            This is Content Section
          </Text>
        </Content>

      </Container>
      </DrawerLayoutAndroid>
    );
  }
}

module.exports = Home;

AppRegistry.registerComponent('Home', () => Home);
