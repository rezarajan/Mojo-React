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

export default class CardViewExtras extends Component {

    constructor (props) {
        super(props);
        this.state = {
            quantity: 0,
            //openIndicator: 'white',
        };
    } 

    render() {

        {/* This condition checks for the status of the restaurant passed and sets the appropriate text colour */}

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


        return (
                <View style={[styles.headerBackground, {backgroundColor: forceContrastColour, width: this.props.itemWidth, height: this.props.itemHeight}]}>
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                                this.setState({
                                    quantity: this.state.quantity>0?this.state.quantity-1:0
                                    })
                        }}>
                    <View style={[styles.start, {height: this.props.itemHeight-1, width: 50, backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                            <Text style={[styles.timings, {color: bottomBarTextColor, fontWeight: 'bold', textAlign: 'center'}]}> - </Text>
                    </View>
                    </TouchableOpacity>
                    <View style={[{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}]}>
                        {/* Spacer View */}
                        {/* <View style={[{height: 4}]}/> */}
                        <View style={styles.mainInfo}>
                                <Text style={[styles.name, {color: bottomTextColor}]}>{this.props.text} - ${this.props.cost.toFixed(2)}</Text>
                        </View>
                        <View style={styles.mainInfo}>
                                <Text style={[styles.name, {color: bottomTextColor}]}>{this.state.quantity}</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                                this.setState({
                                    quantity: this.state.quantity+1
                                    })
                        }}
                    >
                    <View style={[styles.end, {height: this.props.itemHeight-1, width: 50, backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                            <Text style={[styles.timings, {color: bottomBarTextColor, fontWeight: 'bold', textAlign: 'center'}]}> + </Text>
                    </View>
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
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
        fontSize: 14,
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
    start: {
        //in the item's style the width is set to itemWidth-1 to account for the 0.5 border width on either side
        //of the parent
        //justifyContent is then set to center since the flexDirection is set to column. This centers the now
        //offset itemWidth to give a seamless appearance without overlay on the border
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomLeftRadius: 10, 
        borderTopLeftRadius: 10,
    },
    end: {
        //in the item's style the width is set to itemWidth-1 to account for the 0.5 border width on either side
        //of the parent
        //justifyContent is then set to center since the flexDirection is set to column. This centers the now
        //offset itemWidth to give a seamless appearance without overlay on the border
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomRightRadius: 10, 
        borderTopRightRadius: 10,
    }
});
