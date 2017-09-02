// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from "./src/components/Login/Login";
import SignUp from "./src/components/SignUp/SignUp";
import Name from "./src/components/SignUp/Name";
import Email from "./src/components/SignUp/Email";
import Password from "./src/components/SignUp/Password";
import Home from "./src/components/Home/Home";

const App = () => {
  return (
    <Router>
      <Scene key="root"
      hideNavBar={() => this.state.hide}>
        <Scene key="login"
          component={Login}
          title="login"
          initial
        />
        <Scene
          key="signup"
          component={SignUp}
          title="signup"
        />
        <Scene
          key="name"
          component={Name}
          title="name"
        />
        <Scene
          key="email"
          component={Email}
          title="email"
        />
        <Scene
          key="password"
          component={Password}
          title="password"
        />
        <Scene
          key="home"
          component={Home}
          title="home"
        />
      </Scene>
    </Router>
  );
}

export default App;