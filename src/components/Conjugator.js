import React , {Component} from 'react'
import {TextInput, View, Button, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native' 
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
                            <Text textStyle={styles.titleTable}>{"DECLINAZIONE DI " + this.props.lemma.toUpperCase()}</Text>
                            {
                                this.props.flexion.map(e => {
                                    if(e.includes("$")){
                                        e = e.replace("$ ","").replace("£ ","")
                                        return(
                                            <View>
                                                <Text>{'\n'} </Text>
                                                <Text textStyle={styles.secondHeaderTable}> {e} </Text>
                                            </View>
                                        )
                                    }else if(e.includes("£")){
                                        e = e.replace("£ ","")
                                        return(
                                            <View>
                                                <Text>{'\n'}</Text>
                                                <Text textStyle={styles.headerTable}>{e}</Text>
                                            </View>
                                        )
                                    }else{
                                        return(
                                            <Text>{e}</Text>
                                        )
                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                </ScrollView>
            </View>
        )
    }
}