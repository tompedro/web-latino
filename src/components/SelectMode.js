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
            <View >
                <View style = {styles.modeContainer}>
                    <Text style = {styles.titleMode}>SELEZIONA SU COSA TI VUOI ALLENARE</Text>
                    <Text>{'\n'}</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox 
                            status={this.state.adj ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({adj: !this.state.adj})}/>
                        <Text style= {styles.label}>AGGETTIVI E PRONOMI</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox 
                            status={this.state.verbs ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({verbs: !this.state.verbs})}/>
                        <Text style= {styles.label}>VERBI</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox 
                            status={this.state.nouns ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({nouns: !this.state.nouns})}/>
                        <Text style= {styles.label}>NOMI</Text>
                    </View>
                    <Button disabled = {!this.state.adj && !this.state.verbs && !this.state.nouns} onPress= {() => this.props.submit([this.state.adj,this.state.verbs,this.state.nouns])} title = {"GIOCA"}/>
                </View>
            </View>
        )
    }
}