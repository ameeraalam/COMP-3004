import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Text, Button, Center, Footer, FooterTab, Body, Content, Card, CardItem, Grid, Row, Col } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from './Styles';

class ContactUs extends Component {

  previousPage() {
    Actions.pop({});
  }


  render() {
    return (
      <Container>
          <Header style={{backgroundColor:'rgb(72, 110, 255)'}}>
            <Body>
              <Title style={{alignSelf: 'center', fontFamily: 'sans-serif'}}>Contact Us</Title>
            </Body>
          </Header>
          <Content style={{backgroundColor:'#fff'}}>
            <View style={{ marginTop:30, paddingLeft:15}}>
              <Text style={{fontSize: 40, fontFamily: 'sans-serif', color: 'rgb(72, 110, 255)'}}>
                Contact Us
              </Text>
            </View>

            <View style={{marginTop: 7, paddingLeft:15}}>
              <Text style={{fontSize: 15, fontFamily: 'sans-serif', color: 'rgb(72, 110, 255)'}}>
                Please contact us using this form below
              </Text>

              <View style={{marginTop:40, paddingRight:15}}>
                  <TextInput style={{height: 50, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: '#E5E5E5', paddingLeft:15, fontSize:17}}
        					placeholder = "Name"
        					underlineColorAndroid = "transparent"/>

                  <TextInput style={{height: 50, marginTop:25, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: '#E5E5E5', paddingLeft:15, fontSize:17}}
        					placeholder = "Email"
        					underlineColorAndroid = "transparent"/>

                  <TextInput style={{marginTop:25, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: '#E5E5E5', paddingLeft:15, fontSize:17, textAlignVertical:'top'}}
        					underlineColorAndroid = "transparent"
                  placeholder='Message'
                  multiline = {true}
                  numberOfLines = {5}/>

                  <TouchableOpacity onPress = {() => {}}>
          					<Text style = {{backgroundColor:'rgb(72, 110, 255)', textAlign:'center', height:54, color:'#fff', fontSize:18, paddingTop:14, marginTop:25, fontFamily: 'sans-serif'}}>
                      SUBMIT
                    </Text>
          				</TouchableOpacity>
              </View>
            </View>
          </Content>

        </Container>
    );
  }

}

module.exports = ContactUs;

AppRegistry.registerComponent('ContactUs', () => ContactUs);
