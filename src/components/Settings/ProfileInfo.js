import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';


export default class ProfileInfo extends Component {

    async logout() {
        
            try {
        
                await firebase.auth().signOut();

                AsyncStorage.removeItem('userData')
        
                // Navigate to login view
                Actions.login();
        
            } catch (error) {
                console.log(error);
            }
        
        }

    render() {
        return (
            <View >
                {/* Contact Container */}
                <View>
                    <View style={[styles.bar, styles.barHeader]} >
                        <View style={[styles.barItem, {alignItems: 'center', paddingLeft: 0}]} >
                            <Text style={styles.barBottom}>Contact</Text>
                        </View>
                    </View>
                    <View style={[styles.bar]} >
                        <View style={[styles.barItem, styles.barSeparator, {flexDirection: 'row', alignItems: 'center'}]} >
                            <Text style={styles.barBottom}>Email: </Text>
                            <TextInput
                                placeholder="johndoe@email.com"
                                placeholderTextColor='rgba(155,155,155,1)'
                                style={styles.textInput}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                //onChangeText={(text) => this.setState({email:text})}
                            />
                        </View>
                        <View style={[styles.barItem, {flexDirection: 'row', alignItems: 'center'}]} >
                            <Text style={styles.barBottom}>Phone:</Text>
                            <TextInput
                                placeholder="(333) 333-3333"
                                placeholderTextColor='rgba(155,155,155,1)'
                                style={styles.textInput}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                //onChangeText={(text) => this.setState({email:text})}
                            />
                        </View>
                    </View>
                </View>
                {/* Settings Container */}
                <View>
                    <View style={[styles.bar, styles.barHeader]} >
                        <View style={[styles.barItem, {alignItems: 'center', paddingLeft: 0}]} >
                            <Text style={styles.barBottom}>Settings</Text>
                        </View>
                    </View>
                    <View style={[styles.bar]} >
                        <View style={[styles.barItem, styles.barSeparator]} >
                            <Text style={styles.barBottom}>Payment Methods</Text>
                        </View>
                        <View style={[styles.barItem]} >
                            <Text style={styles.barBottom}>Notifications</Text>
                        </View>
                    </View>
                </View>
                {/* Account Container */}
                <View>
                    <View style={[styles.bar, styles.barHeader]} >
                        <View style={[styles.barItem, {alignItems: 'center', paddingLeft: 0}]} >
                            <Text style={styles.barBottom}>Account</Text>
                        </View>
                    </View>
                    <View style={[styles.bar]} >
                        <View style={[styles.barItem, styles.barSeparator]} >
                            <Text style={[styles.barBottom]}>Change Password</Text>
                        </View>
                        <View style={[styles.barItem]} >
                            <TouchableOpacity onPress={()=> this.logout()} >
                                <Text style={[styles.barBottom, {color: 'red'}]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Blank Container (to allow scrolling past the Action Button) */}
                <View>
                    <View style={[styles.bar, styles.barHeader]} >
                        <View style={[styles.barItem, {alignItems: 'center', paddingLeft: 0, paddingBottom: 80}]} >
                        </View>
                    </View>
                </View>
                {/* <View style={styles.profileGrid} > 
                    <View style={styles.profileWrap} >
                        <Image style={styles.photo} source={require('../../images/dojocat.png')} />
                    </View>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileWrap: {
        margin: 2,
        height: 120,
        width: (Dimensions.get('window').width / 2) - 4,
    },
    photo: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    },
    bar: {
        borderTopColor: 'rgba(241,241,241,1)',
        borderTopWidth: 1,
        borderBottomColor: 'rgba(241,241,241,1)',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    barHeader: {
        backgroundColor: 1,
        borderBottomColor: 'rgba(250,250,250,1)',
        borderTopWidth: 0,
    },
    barSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(241,241,241,1)',
    },
    barItem: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 50,
        alignItems: 'flex-start',
    },
    barTop: {
        color: 'rgba(24,172,222,1)',
        fontSize: 14,
        fontFamily: 'Avenir',
        fontWeight: '500',
    },
    barBottom: {
        color: 'rgba(74,74,74,1)',
        fontSize: 14,
        fontFamily: 'Avenir',
    },
    textInput: {
        //flexDirection: 'row',
        //borderRadius: 45,         // Rounded border
        //borderWidth: 2,           // 2 point border widht
        //borderColor: 'rgba(24,172,223,1)',   // White colored border
        //paddingHorizontal: 45,    // Horizontal padding
        //paddingVertical: 8,      // Vertical padding
        paddingLeft: 16,
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        fontFamily: 'Avenir',
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'left',
        width: 286,
        
      },
});
