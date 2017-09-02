import {
    AppRegistry,
  } from 'react-native';

import { StackNavigator } from "react-navigation";

import Login from "./src/components/Login/Login";
import SignUp from "./src/components/SignUp/SignUp";
import Name from "./src/components/SignUp/Name";
import Email from "./src/components/SignUp/Email";
import Password from "./src/components/SignUp/Password";
import Home from "./src/components/Home/Home";
//import SignIn from "./screens/SignIn";

export const SignedOut = StackNavigator({
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: "Sign Up"
//     }
//   },

//TODO: Use conditional statements to switch the text for name, email and password
//and store them in a token to upload to Firebase Auth

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Name: {
    screen: Name,
    navigationOptions: {
      header: null
    }
  },
  Email: {
    screen: Email,
    navigationOptions: {
      header: null
    }
  },
  Password: {
    screen: Password,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
});

AppRegistry.registerComponent('Mojo', () => SignedOut);