import React , {Component} from 'react'
import {TextInput, View, Button, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native' 
import { Table, Row } from 'react-native-table-component'
import styles from '../res/styles'

export default class Dictionary extends Component{
    
    constructor(props){
        super(props)
        this.state = {tableHead: ["Tabella"]}
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                <View>
                    <ScrollView style={styles.dataWrapper}>
                        <View style= {styles.flexionView}>
                            <Table style={styles.conjView}>
                                <Row data = {["DECLINAZIONE DI " + this.props.lemma.toUpperCase()]} textStyle={styles.titleTable} />
                                {
                                    this.props.flexion.map(e => {
                                        if(e.includes("$")){
                                            e = e.replace("$ ","").replace("£ ","")
                                            return(
                                                <View>
                                                    <Row data = {['\n']} />
                                                    <Row data = {[e]} textStyle={styles.secondHeaderTable}/>
                                                </View>
                                            )
                                        }else if(e.includes("£")){
                                            e = e.replace("£ ","")
                                            return(
                                                <View>
                                                    <Row data = {['\n']} />
                                                    <Row data = {[e]} textStyle={styles.headerTable}/>
                                                </View>
                                            )
                                        }else{
                                            return(
                                                <Row data = {[e]} />
                                            )
                                        }
                                    })
                                }
                            </Table>
                        </View>
                    </ScrollView>
                </View>
                </ScrollView>
            </View>
        )
    }
}