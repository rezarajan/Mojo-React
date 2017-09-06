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

    componentDidMount () {
        this.props.dostuff;
        //console.log(this.props.dostuff);
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

        var tagView = [];

        //Loops through the tags JSON array and gets the key/value pair
        for (var key in this.props.tags) {
            if (this.props.tags.hasOwnProperty(key)) {
                tagView.push({tag: key});
            }
        }

        //console.log(tagView);
        return (
            //cretaes a background for the profile pic
            <View style={[styles.headerBackground, {backgroundColor: this.props.backgroundColor, width: this.props.itemWidth}]}>
                <View style={styles.header}>
                    <View style={styles.profilepicWrap}>
                        <Image style={styles.profilepic} source={{uri:this.props.icon}} />
                    </View>

                    <View style={[styles.infoHolder]}>
                        <View style={styles.mainInfo}>
                            <Text style={styles.name}>{this.props.text}</Text>
                            <Text style={[styles.openIndicator, {color: this.state.openIndicator}]}>{this.props.open}</Text>
                        </View>
                        
                        <Text style={[styles.moreinfo]}>{this.props.genre}</Text>
                        <Text style={[styles.moreinfo, {marginTop: 16, width: 186, fontSize: 12}]}>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. At certe gravius.
                        </Text>

                        <View style={styles.categoriesGrid}>
                            {/* rendering the tags */}
                            {tagView.map((key, i) => {
                                return (
                                    //<View><Text>{key.tag}</Text></View>
                                    
                                    <RoundedText 
                                    key={i}
                                    text={key.tag}
                                    color='#FFFFFF'
                                    backgroundColor='rgba(24,172,222,1)'
                                    />
                                );
                            })}
                        </View>
                        <Text style={[styles.moreinfo, {marginTop: 16, marginBottom: 8, fontSize: 12, fontWeight: 'bold'}]}>Average Time to Delivery: {this.props.waitTime}</Text>
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
    },
});
