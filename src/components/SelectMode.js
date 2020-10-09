import React , {Component} from 'react'
import { Image, Text, View, Button  } from 'react-native' 
import { Checkbox } from 'react-native-paper'
import styles from '../res/styles'


export default class Dictionary extends Component{
    
    constructor(props){
        super(props)
        this.state={
            adj : false,
            verbs : false,
            nouns: false
          }
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.modeContainer}>
                    <Text style = {styles.titleMode}>SELEZIONA SU COSA TI VUOI ALLENARE</Text>
                    <Text>{'\n'}</Text>
                    <View style={styles.checkboxContainer}>
                        <input 
                            type="checkbox"
                            checked={this.state.adj}
                            disabled = {false}
                            onChange={() => this.setState({adj: !this.state.adj})}/>
                        <Text style= {styles.label}>AGGETTIVI E PRONOMI</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <input 
                            type="checkbox"
                            disabled = {false}
                            checked={this.state.verbs}
                            onChange={() => this.setState({verbs: !this.state.verbs})}/>
                        <Text style= {styles.label}>VERBI</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <input 
                            type="checkbox"
                            disabled = {false}
                            checked={this.state.nouns}
                            onChange={() => this.setState({nouns: !this.state.nouns})}/>
                        <Text style= {styles.label}>NOMI</Text>
                    </View>
                    <Button disabled = {!this.state.adj && !this.state.verbs && !this.state.nouns} onPress= {() => this.props.submit([this.state.adj,this.state.verbs,this.state.nouns])} title = {"GIOCA"}/>
                </View>
            </View>
        )
    }
}