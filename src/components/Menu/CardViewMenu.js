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

const deviceW = Dimensions.get('window').width;

export default class CardViewMenu extends Component {

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

        //receives the contrasting color and sets the value accordingly
        var contrastColour = this.props.contrastratio === 'dark'?'white':'rgba(35,31,32,1)';

        //for the case where the background colour is white it forces a black background
        var forceContrastColour = this.props.backgroundColor === 'white'?'black':this.props.backgroundColor;

        var bottomBarTextColor = forceContrastColour === 'black'?'white':contrastColour;

        //sets the bottom bar colour based 
        var bottomBarTextColor;
        forceContrastColour === 'black'?
        bottomTextColor = 'white'
        :
        bottomTextColor = contrastColour
        ;

        var tagView = [];

        
        //Loops through the tags JSON array and gets the key/value pair of restaurant identifier tags
        for (var key in this.props.tags) {
            if (this.props.tags.hasOwnProperty(key)) {
                tagView.push({tag: key});
            }
        }


        return (
                <View style={[styles.headerBackground, {backgroundColor: 'white', width: this.props.itemWidth, height: this.props.itemHeight}]}>
                    <View style={[{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}]}>
                        {/* Spacer View */}
                        <View style={[{height: 4}]}/>
                    <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                            {/* <View style={styles.profilepicWrap}>
                                <Image style={styles.profilepic} source={{uri:this.props.icon}} />
                            </View> */}
                            <View style={styles.mainInfo}>
                                <Text style={[styles.name, {color: 'rgba(35,31,32,1)'}]}>{this.props.text}</Text>
                            </View>
                        </View>

                        <View style={styles.extraInfo}>
                            {/* The open indicator dot and restaurant timings */}
                            {/* <View style={[styles.openIndicatorIcon, {backgroundColor: this.state.openIndicator}]}/> */}
                            <View style={[{alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}]}>
                                <View style={[{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={[styles.timings, {fontWeight: 'bold', color: 'rgba(35,31,32,1)'}]}>$0.00</Text>
                                    {/* <Text style={[styles.timings, {color: 'rgba(35,31,32,1)'}]}>{this.props.open}</Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                    <View style={[styles.bottomBar, {width: this.props.itemWidth-1, backgroundColor: forceContrastColour}]}>
                            <Text style={[styles.timings, {color: bottomBarTextColor, fontWeight: 'bold', textAlign: 'center'}]}> Get this Item </Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:8,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(181,181,181,1)',
    },
    profilepicWrap : {
        marginLeft: 10,
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 45,
        borderWidth: 0,
    },
    mainInfo: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginLeft: 26,
        marginRight: 16,
    },
    extraInfo: {
        flexDirection: 'column',        
        marginRight: 26,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: 'white',
    },
    timings: {
        alignItems: 'center',
        fontSize: 14,
        color: 'white',
        fontFamily: 'Avenir',
    },
    openIndicatorIcon : {
        marginLeft: 10,
        marginTop: 8,
        marginBottom: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        borderColor: 'rgba(181,181,181,1)',      
        borderWidth: 0.5,  
    },
    moreinfo: {
        fontSize: 14,
        color: 'white',
        fontWeight: '300',
        fontFamily: 'Avenir',
    },
    bottomBar: {
        //in the item's style the width is set to itemWidth-1 to account for the 0.5 border width on either side
        //of the parent
        //justifyContent is then set to center since the flexDirection is set to column. This centers the now
        //offset itemWidth to give a seamless appearance without overlay on the border
        height: 30, 
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
    }
});
