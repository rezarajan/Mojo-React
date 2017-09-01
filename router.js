import {
    AppRegistry,
  } from 'react-native';

import { StackNavigator } from "react-navigation";

import Login from "./src/components/Login/Login";
import SignUp from "./src/components/SignUp/SignUp";
//import SignIn from "./screens/SignIn";

export const SignedOut = StackNavigator({
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: "Sign Up"
//     }
//   },
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
});

AppRegistry.registerComponent('Mojo', () => SignedOut);