import React , {Component} from 'react'
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native' 
import styles from '../res/styles'

export default class Singleplayer extends Component{

    constructor(props){
        super(props)
        this.getQuestion = this.getQuestion.bind(this)
        this.getHint = this.getHint.bind(this)
    }

    getQuestion(){
        if(this.props.question !== null && this.props.question !== undefined && this.props.question !== ""){
            return this.props.question[0].toUpperCase() + this.props.question.substring(1)
        }else{
            return ""
        }
    }

    getHint(){
        let int = this.props.hint[0] ? (this.props.hint[0].includes(" ") ? (this.props.hint[0].length > 1 ? 1 : 0) : 0) : 0
        
        if(this.props.hint[int] !== null && this.props.hint[int] !== undefined && this.props.hint[int] !== ""){
            let res = this.props.hint[int][0].toUpperCase()
            for(let i = 1; i < this.props.hint[int].length - 1; i++){
                res += "-"
            }
            res += this.props.hint[int][this.props.hint[int].length - 1]
            return res
        }else{
            return ""
        }
    }

    render(){
        return(
            <View>
                <Text style = {styles.scoreText}>{this.props.points}</Text>
                <View style={styles.container}>
                    <Text style = {styles.bigText}>{this.getQuestion()}</Text>
                    <TextInput style={styles.textInput} 
                        onChangeText={text => {
                            this.props.check(text)
                        }}
                        value={this.props.value}
                        clearButtonMode='always'/>
                    <Text style = {styles.bigText}>{this.getHint()}</Text>
                </View>
            </View>
        )
    }
}