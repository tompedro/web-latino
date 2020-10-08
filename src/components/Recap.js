import React , {Component} from 'react'
import {View, Button, Text } from 'react-native' 
import styles from '../res/styles'

export default class Recap extends Component{
    
    constructor(props){
        super(props)
        this.getLetter = this.getLetter.bind(this)
    }

    getLetter(){
        if(this.props.errors == 1){
            return "E"
        }else{
            return "I"
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style = {styles.title}>COMPLIMENTI!</Text>
                <View style={styles.container}>
                    <Text style = {styles.bigText}>HAI TOTALIZZATO </Text>
                    <Text style = {styles.bigText}>{this.props.errors} ERROR{this.getLetter()}</Text>
                </View>
            </View>
        )
    }
}