import React , {Component} from 'react'
import {TextInput, View, Button, Text, ScrollView, TouchableOpacity, Dimensions, Image, Alert } from 'react-native' 
import styles from '../res/styles'
import Conjugator from './Conjugator'

export default class Dictionary extends Component{
    
    constructor(props){
        super(props)
        this.state = {value : "", links : [], lemmas : [], state : 0, word: [], flexion : []}
        this.search = this.search.bind(this)
        this.parse = this.parse.bind(this)
        this.searchWord = this.searchWord.bind(this)
        this.parseWord = this.parseWord.bind(this)
        this.searchFlex = this.searchFlex.bind(this)
        this.parseFlex = this.parseFlex.bind(this)
    }

    search(){
        fetch('https://cors-anywhere.herokuapp.com/https://www.dizionario-latino.com/dizionario-latino-italiano.php?parola='+this.state.value+'&md=ff')
            .then(data => data.text())
            .then(data => {
                alert(data)
                if(data.includes('risultati')){
                    this.setState({state: 0}, () => {this.parse(data)})
                }else if(data.includes('myth')){
                    this.setState({state: 1}, () => {this.parseWord(data,this.state.value)})
                } else {
                    this.setState({state: 1, word : ["Nessun risultato trovato."]})
                } 
                
            })
    }

    parse(data){
        try{
            const firstParse = data.split('risultati')[1].split('Se non avete')[0].split('href="')

            let links = []
            let lemmas = []

            for(let i = 1; i < firstParse.length; i++){
                if(i % 2 == 0){
                    if(firstParse[i].includes('"><b>') && firstParse[i].includes('<i>')){
                        links.push(firstParse[i].split('"')[0])
                        lemmas.push(firstParse[i].split('"><b>')[1].split('</b>')[0] + ' ' + firstParse[i].split('<i>')[1].replace('[','').split('</i>')[0])
                    }
                    
                }
            }
            this.setState({links: links, lemmas: lemmas})
        } catch (err) {
            alert(err)
        }
    }

    searchWord(link){
        fetch('https://cors-anywhere.herokuapp.com/https://www.dizionario-latino.com/' + link)
            .then(data => data.text())
            .then(data => this.setState({state: 1}, () => {this.parseWord(data,link)}))
    }

    parseWord(data, link){
        try {
            const firstParse = data.split('myth')[1].split('permalink')[0]
            let res = []

            res.push(firstParse.split('"lemma">')[1].split('</')[0] + "\n")
            res.push(firstParse.split('"paradigma">')[1].split('</')[0] + "\n")
            res.push(firstParse.split('"grammatica">')[1].split('</')[0] + "\n")

            let list = firstParse.split('"italiano"')
            let trad = ""

            for(let i = 1; i < list.length; i++){

                if(list[i].includes('class="ambito"')){
                    trad += " - " + list[i].split('</span>')[1].split('</')[0] + "\n"
                    continue
                } else if(list[i].includes('forma passiva di')){
                    trad += ' - ' + 'forma passiva di ' + list[i].split("'>")[1].split('</')[0] + "\n"
                    continue
                }

                trad += " - " + list[i].split('>')[1].split('</')[0] + "\n"
            }

            res.push(trad)

            if(link.includes('lemma=')){
                res.push(link.split('lemma=')[1])
            }else{
                res.push(link)
            }
            

            this.setState({word : res})
        } catch (err) {
            alert(err)
        }
    }

    searchFlex(value){
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                if(request.responseText.includes('<div class="col span_1_of_2">')){
                    this.parseFlex(request.responseText)
                }else{
                    this.setState({flexion : ["Nessuna flessione trovata."]})
                }
            } else {
                alert('error');
            }
        };

        request.open('POST', 'https://cors-anywhere.herokuapp.com/https://www.dizionario-latino.com/dizionario-latino-flessione.php?lemma='+value+'&md=ff');
        request.send();
    }

    parseFlex(data){
        try{
            let firstParse = data.split('<div class="col span_1_of_2">')
            let firstLine = firstParse[0].split('<font color="#FFFFFF"><b>')[1].split('</b></font>')[0]
            let allForms = ["£ " + firstLine]
            let indexErase = 2
            
            if(firstParse.length % 2 == 0){
                indexErase --
            }

            for(let formIndex = 1; formIndex < firstParse.length - indexErase; formIndex++){
                let form = firstParse[formIndex].split('<tr bgcolor="')
                for(let rowIndex = 1; rowIndex < form.length; rowIndex++){
                    let row = ('<' + form[rowIndex]).split('<')
                    
                    if(rowIndex == form.length - 1){
                        row = ('<' + form[rowIndex].split('</div>')[0]).split('<')
                    }
                    
                    let res = ""

                    for(let i = 0; i < row.length; i ++){
                        let a = ""
                        if(row[i].includes('font color="#FFFFFF"')){
                            a = '£'
                        }
                        if(row[i].includes('td colspan="2"')){
                            a = '$'
                        }
                        if(row[i][row.length - 1] !== '>'){
                            a += row[i].slice(row[i].indexOf('>') + 1,row[i].length).replace(/,/g,'').replace(/&nbsp;/g,'').replace(/ /g,'').replace(/\n/g,'').replace(/&#150;/g,'-').replace('/span>','')
                            if(a !== "" && a !== "\n") res += a + " "
                        }
                    }
                    allForms.push(res)
                }
            }
            this.setState({flexion : allForms, state: 2})
        } catch (err) {
            alert(" hei " + err)
        }
    }

    render(){
        const { width, height } = Dimensions.get('window')
        return(
            <View style = {styles.viewContainer2}>
                <TextInput style={styles.searchTextInput} 
                            onChangeText={text => {
                                this.setState({value: text})
                            }}
                            clearButtonMode='always'/>
                <Button title = "Cerca" onPress = {() => {this.search()}}/>
                <Text>{"\n"}</Text>
                {
                    this.state.state == 0 ? 
                    ( 
                        <ScrollView
                            ref={scrollView => {
                            this.scrollView = scrollView;
                            }}
                            style={styles.scrollView}
                            horizontal={false}
                            decelerationRate={0}
                            snapToInterval={width - 60}
                            snapToAlignment={'center'}
                            contentInset={{
                                top: 0,
                                left: 30,
                                bottom: 0,
                                right: 30,
                            }}>
                            <View style = {styles.viewContainer2}>
                                { this.state.lemmas.map((lemma,key) => {
                                    return(
                                        <View style = {styles.scrollView}>
                                            <Text style = {styles.links} onPress = {() => {
                                                this.searchWord(this.state.links[key])
                                            }}>{lemma}</Text>
                                            <Text>{"\n"}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    ) : (
                        this.state.state == 1 ? (
                        <View style= {styles.container}>
                            <Text style = {styles.lemma}>{this.state.word[0]}</Text>
                            <Text style = {styles.paradigma}>{this.state.word[1]}</Text>
                            <Text style = {styles.grammatica}>{this.state.word[2]}</Text>
                            
                            <ScrollView
                                ref={scrollView => {
                                this.scrollView = scrollView;
                                }}
                                style={styles.scrollView}
                                horizontal={false}
                                decelerationRate={0}
                                snapToInterval={width - 60}
                                snapToAlignment={'center'}
                                contentInset={{
                                    top: 0,
                                    left: 30,
                                    bottom: 0,
                                    right: 30,
                                }}>
                                    <View style = {styles.scrollView}>
                                        <Text style = {styles.traduzione}>{this.state.word[3]}</Text>
                                        {
                                            this.state.word[0] !== "Nessun risultato trovato." ? (
                                                <Button style = {styles.Conjugator} title = "Conjugator" onPress = {() => {
                                                    this.searchFlex(this.state.word[4])
                                                }}/>
                                            ):(<View></View>)
                                        }
                                        <Text>{"\n"}</Text>
                                    </View>
                            </ScrollView>
                        </View> 
                        ):(

                            <Conjugator flexion = {this.state.flexion} lemma = {this.state.word[0]}/>
                        )
                    )
                }
            </View>
        )
    }
}