import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import RoundedText from './RoundedText';

const deviceW = Dimensions.get('window').width;

export default class CardView extends Component {

    constructor (props) {
        super(props);

        this.state = {
            openIndicator: 'white',
        };
    } 

    render() {

        {/* This condition checks for the status of the restaurant passed and sets the appropriate text colour */}

        if(this.props.open === "Open"){
            this.state.openIndicator='chartreuse'
        }
        else if(this.props.open === "Closing"){
            this.state.openIndicator='coral'
        }
        else if(this.props.open === "Closed"){
            this.state.openIndicator='crimson'
        }
        else {
            this.state.openIndicator='white'
        }

        var itemTagsArray = [];
        var tagKeys = [];

        //Loops through the tags JSON array and gets the key/value pair of menu item identifier tags
        for (var key in this.props.itemTags) {
            if (this.props.itemTags.hasOwnProperty(key)) {
                tagKeys = [...tagKeys, key];
                console.log(this.props.itemTags[key]);
                Object.keys(this.props.itemTags[key]).map((keyName, i) => {
                    itemTagsArray = [...itemTagsArray, keyName];
                })
            }
        }
        
        return (
            //cretaes a background for the profile pic
            <View style={[styles.headerBackground, {backgroundColor: this.props.backgroundColor, width: this.props.itemWidth, height: this.props.itemHeight}]}>
                <View style={styles.header}>

                    <View style={[styles.infoHolder]}>
                        
                        <Text style={[styles.moreinfo]}>{this.props.genre}</Text>

                            {/* rendering the menu items and tags */}
                            {
                                tagKeys.map((tagKey, i) => {
                                    return(
                                        [
                                            <Text key={i} style={[styles.name, {marginTop: 16}]}>{tagKey}</Text>,
                                            <View style={styles.categoriesGrid}>
                                                {Object.keys(this.props.itemTags[tagKey]).map((keyName, j) => {
                                                    return (
                                                        <View key={j}>
                                                            <RoundedText 
                                                            text={keyName}
                                                            color='#FFFFFF'
                                                            backgroundColor='rgba(24,172,222,1)'
                                                            style={{borderRadius: 19, width: 72, height: 72}}
                                                            />
                                                            <Text 
                                                            style={[
                                                                styles.moreinfo, 
                                                                {
                                                                    width: 72,
                                                                    marginTop: 8, 
                                                                    marginBottom: 8, 
                                                                    fontSize: 12, 
                                                                    fontWeight: 'bold',
                                                                    alignItems: 'center',
                                                                    justifyContent:'center',
                                                                    textAlign: 'center',
                                                                }
                                                                ]}>
                                                            {keyName}
                                                            </Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        ]
                                    );
                                })
                                
                            }                            
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        alignItems: 'stretch',
        marginTop:8,
        borderRadius: 32,
    },
    header: {
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'transparent',
        marginTop: 34,
    },
    profilepicWrap : {
        alignSelf: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 4,
        backgroundColor: 'white',
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 0,
    },
    infoHolder: {
        marginTop: 34, 
        marginLeft: 16,
        marginRight: 16,
    },
    mainInfo: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
    },
    name: {
        //width: 136,
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: 'white',
    },
    openIndicator: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    moreinfo: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: 'white',
        fontWeight: '300',
        fontFamily: 'Avenir',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        justifyContent: 'space-between',
    },
});
