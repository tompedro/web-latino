import React, {Component} from 'react' 
import {TouchableOpacity, Image, Button } from 'react-native-web' 
import styles from '../res/styles'
import words from '../res/words.json'
import Init from './Init'
import Singleplayer from './Singleplayer'
import Recap from './Recap'
import Dictionary from './Dictionary'
import SelectMode from './SelectMode'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questionList : [],
      replyList : [],
      question : "",
      reply : "",
      points : 0,
      init : 0,
      value : "",
      hint : "",
      errors: 0,
      timer : null,
      showMenu : true,
      latToIta : false
    }
    this.findWord = this.findWord.bind(this)
    this.check = this.check.bind(this)
    this.setMode = this.setMode.bind(this)
    this.reset = this.reset.bind(this)
    this.submitMenu = this.submitMenu.bind(this)
  }

  findWord(){
    try {
      let randomNumber = Math.floor(Math.random() * this.state.questionList.length)

      let r = [].concat(this.state.replyList.splice(randomNumber,1)[0])

      for(let i = 0; i < r.length; i++){
        r[i] = r[i].split(" ")[0].replace('ō','o').replace('ē','e').replace('ī','i').replace('ā','a').replace('ū','u')
      }
      
      this.setState({reply : r})
      this.setState({question :this.state.questionList.splice(randomNumber,1)[0]})

      clearTimeout(this.state.timer)

      this.state.timer = setTimeout(() => {
        this.setState({hint:this.state.reply})
      }, 10000)

    } catch(err) {
      alert(err)
      this.setState({question : "C'E' UN PROBLEMINO"})
    }
    
  }

  check(text){
    this.setState({value: text})

    this.state.reply.forEach(reply => {
      if(text.toLowerCase().replace(/ /g,'') == reply.toLowerCase().replace(/ /g,'')){
        this.setState({value : "", hint : ""})
        
        if(this.state.hint === ""){
          this.setState({points : this.state.points + 1})
        }else{
          this.setState({errors : this.state.errors + 1})
        }
        
        if(this.state.points + 1 >= 6){
          this.setState({init : 2})
  
          setTimeout(() => {
            this.reset()
          }, 5000);
  
        } else {
          this.findWord()
        }
      }
    })
  }

  setMode(mode){
    let n = Math.floor(Math.random() * 3)
    let choice

    if(n == 0){
      choice = "nomi"
    } else if(n == 1){
      choice = "aggettivi"
    } else if(n == 2){
      choice = "verbi"
    }

    if(mode == 0){
      this.setState({init: 1, showMenu: true, latToIta : true})
      /*
      this.setState({
        questionList : words[choice].map(word => word.lemma),
        replyList : words[choice].map(word => word.traduzione),
        init : 1}, () => {this.findWord()})*/

    } else if(mode == 1){
      this.setState({init: 1, showMenu: true, latToIta : false})
      /*
      this.setState({
        questionList : words[choice].map(word => word.traduzione[0]),
        replyList : words[choice].map(word => word.lemma),
        init : 1}, () => {this.findWord()})*/
    } else if(mode == 2){
      this.setState({ init : 3 })
    }
    
  }

  submitMenu(data){
    this.reset(1)
    let lList = []
    let iList = []

    if(data[0]){
      lList.push(...words["aggettivi"].map(word => word.lemma))
      iList.push(...words["aggettivi"].map(word => word.traduzione))
    }
    if(data[1]){
      lList.push(...words["verbi"].map(word => word.lemma))
      iList.push(...words["verbi"].map(word => word.traduzione))
    }
    if(data[2]){
      lList.push(...words["nomi"].map(word => word.lemma))
      iList.push(...words["nomi"].map(word => word.traduzione))
    }

    if(this.state.latToIta){
      this.setState({questionList:lList, replyList: iList, showMenu : false}, () => {this.findWord()})
    }else{
      this.setState({questionList:iList.map(e => e[0]), replyList: lList, showMenu : false}, () => {this.findWord()})
    }
    
  }

  reset(init = 0){
    this.setState({
      questionList : [],
      replyList : [],
      question : "",
      reply : "",
      points : 0,
      init : init,
      value : "",
      hint : "",
      errors : 0
    })
  }

  render(){
    return (
      <div style={styles.container}>
        {
          this.state.init == 0 ? (
            <Init setMode = {this.setMode}/>
          ) : (
            this.state.init == 1 ? (
              <div style={styles.sView}>
                <TouchableOpacity onPress={() => {this.setState({init: 0})}}>
                  <Image source = {require('../res/arrow.png')} style={styles.arrow}/>
                </TouchableOpacity>
                {
                  this.state.showMenu ? (
                    <SelectMode submit = {this.submitMenu}/>
                  ):(
                    <Singleplayer points = {this.state.points}
                      question = {this.state.question}
                      check = {this.check}
                      value = {this.state.value}
                      hint = {this.state.hint}/>
                  )
                }

                
              </div>
            ) : (
              this.state.init == 2 ? (
                <Recap errors = {this.state.errors} />  
              ) : (
                <div style={styles.sdiv}>
                  <TouchableOpacity onPress={() => {this.setState({init: 0})}}>
                    <Image source = {require('../res/arrow.png')} style={styles.arrow}/>
                  </TouchableOpacity>

                  <Dictionary />
                </div>
              )
            )
          )
        }
      </div>
    ) 
    
  }
  
}

export default App;