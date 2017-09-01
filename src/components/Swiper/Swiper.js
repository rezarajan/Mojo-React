/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

import React, { Component } from 'react'
import {
  Dimensions,       // Detects screen dimensions
  Platform,         // Detects platform running the app
  ScrollView,       // Handles navigation between screens
  StyleSheet,       // CSS-like styles
  View,             // Container component
  TouchableOpacity,
  Text, 
} from 'react-native';
import Button from '../Button.js'
import * as firebase from 'firebase'
import { StackNavigator } from 'react-navigation';

firebase.initializeApp({
  apiKey: "AIzaSyDm1S6fl9AeiaHOYvFidMbD8gjet1B9my0",
  authDomain: "mojo-611fa.firebaseapp.com",
  databaseURL: "https://mojo-611fa.firebaseio.com",
  storageBucket: "mojo-611fa.appspot.com"
});

// Detect screen width and height
const { width, height } = Dimensions.get('window');

export default class OnboardingScreens extends Component {

  // Props for ScrollView component
  static defaultProps = {
    // Arrange screens horizontally
    horizontal: true,
    // Scroll exactly to the next screen, instead of continous scrolling
    pagingEnabled: true,
    // Hide all scroll indicators
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    // Do not bounce when the end is reached
    bounces: false,
    // Do not scroll to top when the status bar is tapped
    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,
    // Do not adjust content behind nav-, tab- or toolbars automatically
    automaticallyAdjustContentInsets: false,
    // Fisrt is screen is active
    index: 0
  };

  state = this.initState(this.props);

  /**
   * Initialize the state
   */
  initState(props) {

    // Get the total number of slides passed as children
    const total = props.children ? props.children.length || 1 : 0,
      // Current index
      index = total > 1 ? Math.min(props.index, total - 1) : 0,
      // Current offset
      offset = width * index;

    const state = {
      total,
      index,
      offset,
      width,
      height,
    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset
    };

    return state;
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  }

  /**
   * Scroll end handler
   * @param {object} e native event
   */
  onScrollEnd = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * this.state.width
    );
  }

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollEndDrag = e => {
    const { contentOffset: { x: newOffset } } = e.nativeEvent,
      { children } = this.props,
      { index } = this.state,
      { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (offset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false;
    }
  }

  /**
   * Update index after scroll
   * @param {object} offset content offset
   */
  updateIndex = (offset) => {
    const state = this.state,
      diff = offset - this.internals.offset,
      step = state.width;
    let index = state.index;

    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer
    index = parseInt(index + Math.round(diff / step), 10);

    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index
    });
  }

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  }

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */
  renderScrollView = pages => {
    return (
      <ScrollView ref={component => { this.scrollView = component; }}
        {...this.props}
        contentContainerStyle={[styles.wrapper, this.props.style]}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
      >
        {pages.map((page, i) =>
          // Render each slide inside a View
          <View style={[styles.fullScreen, styles.slide]} key={i}>
            {page}
          </View>
        )}
      </ScrollView>
    );
  }

  /**
   * Render pagination indicators
   */
  renderPagination = () => {
    if (this.state.total <= 1) {
      return null;
    }

    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    let dots = [];

    for (let key = 0; key < this.state.total; key++) {
      dots.push(key === this.state.index
        // Active dot
        ? React.cloneElement(ActiveDot, { key })
        // Other dots
        : React.cloneElement(Dot, { key })
      );
    }

    return (
      <View
        pointerEvents="none"
        style={[styles.pagination, styles.fullScreen]}
      >
        {dots}
      </View>
    );
  }

  /**
   * Render Sign In or Get Started button
   */
  renderButton = () => {
    const lastScreen = this.state.index === this.state.total - 1;
    const { navigate } = this.props.navigation;
    return (
      <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
        {lastScreen
          // Show this button on the last screen
          // TODO: Add a handler that would send a user to your app after onboarding is complete
          ? <Button text="Get Started" onPress={() => navigate('SignUp')} />
          // Or this one otherwise
          : <Button text="Sign Up" onPress={() => navigate('SignUp')} />
        }
      </View>
    );
  }

    /**
   * Render Sign In or Get Started button
   */
  renderLoginButton = () => {
    const lastScreen = this.state.index === this.state.total - 1;
    return (
      <View pointerEvents="box-none" style={[styles.loginbuttonWrapper, styles.fullScreen]}>
        {
          //<Button text="Login" onPress={() => this.swipe()} />
            <TouchableOpacity onPress={() => this.login()} >
                <Text style={styles.titleText}> Login </Text>
            </TouchableOpacity>
        }
      </View>
    );
  }


    async login(email, pass) {

        email = "stripe_test@gmail.com";
        pass = "123456"
        
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);
    
            console.log("Logged In!");
    
            // Navigate to the Home page
    
        } catch (error) {
            console.log(error.toString())
        }
    
    }


  /**
   * Render the component
   */
  render = ({ children } = this.props) => {
    return (
      <View style={[styles.container, styles.fullScreen]}>
        {/* Render screens */}
        {this.renderScrollView(children)}
        {/* Render pagination */}
        {this.renderPagination()}
        {/* Render Sign In or Get Started button */}
        {this.renderButton()}
        {/* Render Sign In or Get Started button */}
        {this.renderLoginButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen: {
    width: width,
    height: height
  },
  // Main container
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  // Slide
  slide: {
    backgroundColor: 'transparent'
  },
  // Pagination indicators
  pagination: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  // Pagination dot
  dot: {
    backgroundColor: 'rgba(24,172,223,1)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 3,
    marginBottom: 3
  },
  // Active dot
  activeDot: {
    backgroundColor: 'rgba(139,213,239,1)',
  },
  // Sign Up/Get Started Button wrapper
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 130,
    left: 0,
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
    // Sign Up/Get Started Button wrapper
    loginbuttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        top: 16,
        left: 0,
        flex: 1,
        paddingHorizontal: 28,
        paddingVertical: 20,
        alignItems: 'flex-end'
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(24,172,223,1)',
      },
});