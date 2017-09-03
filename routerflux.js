// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from "./src/components/Login/Login";
import LoginEmail from "./src/components/Login/Email";
import LoginPassword from "./src/components/Login/Password";
import SignUp from "./src/components/SignUp/SignUp";
import Name from "./src/components/SignUp/Name";
import Email from "./src/components/SignUp/Email";
import Password from "./src/components/SignUp/Password";
import PasswordRe from "./src/components/SignUp/PasswordRe";
import Home from "./src/components/Home/Home";

const App = () => {
  return (
    <Router>
      <Scene key="root"
      hideNavBar={() => this.state.hide}>
        <Scene key="login"
          component={Login}
          title="login"
          type="reset"
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
          key="passwordre"
          component={PasswordRe}
          title="passwordre"
        />
        <Scene
          key="loginemail"
          component={LoginEmail}
          title="loginemail"
        />
        <Scene
          key="loginpassword"
          component={LoginPassword}
          title="loginpassword"
        />
        <Scene
          key="home"
          component={Home}
          type="reset"
          title="home"
        />
      </Scene>
    </Router>
  );
}

export default App;