import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from '../Login/Login';
import Home from '../Home/Home';
import Styles from './styles';
import {DrawerNavigator} from 'react-navigation';


export default () => (

	<Router navigationBarStyle={Styles.navbarContainer} titleStyle={Styles.navbarTitle}>
  		<Scene key = "root">
  			<Scene key = "login" component = {Login} title = "Ryde" />
        <Scene key = "home" component = {Home} hideNavBar = {true}/>
  		</Scene>
	</Router>
);
