import React , {Component} from 'react'
import {StyleSheet, View, Button, Text,TouchableOpacity,Image } from 'react-native' 

export default class Singleplayer extends Component{

    constructor(props){
        super(props)
        this.bannerError = this.bannerError.bind(this)
        // intersitial : ca-app-pub-5384500682030910~3065268612
        //<Text style = {styles.title}>QUIZ LATINO</Text>
        /*<AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-5384500682030910/6270355761"
                    onDidFailToReceiveAdWithError={(err) => this.bannerError(err)} />*/
    }

    bannerError(err){
        alert(err)
    }

    render(){
        return(
            <View style={styles.initContainer}>
                <Text style = {styles.title}>QUIZ LATINO</Text>
                <TouchableOpacity onPress={() => {this.props.setMode(0)}} style = {{alignItems:'center'}}>
                        <View style = {styles.element}>
                                <Image source = {require('../res/cesare1.jpg')} style={styles.cesareImage}/>
                            <View>
                                <Text style = {styles.littleTest}>IN LATINO</Text>
                                <Text style = {styles.text}>Gioca per ricordarti i vocaboli latini!</Text>
                            </View>
                            
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.setMode(1)}} style = {{alignItems:'center'}}>
                        <View style = {styles.element}>
                        <View>
                            <Text style = {styles.littleTest}>IN ITALIANO                     </Text>
                            <Text style = {styles.text}>Gioca per tradurre i vocaboli italiani!</Text>
                        </View>
                        
                            <Image source = {require('../res/dante.png')} style={styles.danteImage}/>
                        
                            
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.setMode(2)}} style = {{alignItems:'center'}}>
                        <View style = {styles.element}>
                            <Image source = {require('../res/dictionary.png')} style={styles.dictionaryImage}/>
                            <View>
                                <Text style = {styles.littleTest}>DIZIONARIO</Text>
                                <Text style = {styles.text}>Consulta il dizionario!</Text>
                            </View>
                        </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: '20%'
    },
    dictionaryImage: {
        width:110,
        height:110,
        alignSelf: 'flex-start',
        left: '-10%'
    },
    danteImage: {
        width:100,
        height:120,
        alignSelf: 'flex-end'
    },
    cesareImage: {
        width:100,
        height:120,
        alignSelf: 'flex-start'
    },
    initComponent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    divider:{
        width: '100%',
        height: '10%'
    },
    element: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    littleTest: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle:'italic'
    },
    text: {
        fontSize: 13,
        fontStyle:'italic'
    }
});