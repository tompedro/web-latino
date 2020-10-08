import { StyleSheet, Text, View, Dimensions } from 'react-native' 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewContainer: {
      width: '90%'
    },
    containerWord: {
      width: '90%',
      alignItems: 'stretch'
    },
    textInput: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 20,
      margin: 10,
      borderRadius: 20,
      width: 300 
    },
    title:{
      marginTop: '50%',
      fontSize: 40,
      fontWeight: "bold"
    },
    bigText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign : 'center'
    },
    scoreText: {
      alignSelf: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    links:{
      fontSize: 15,
      color: "#0099FF"
    },
    searchTextInput: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 20,
      margin: 10,
      borderRadius: 20,
      width: 300,
      marginTop: '20%'
    },
    lemma: {
      fontSize: 20,
      color: "#000000",
      fontWeight: "bold",
      textAlign: 'justify',
      lineHeight: 20
    },
    paradigma: {
      fontSize: 13,
      color: "#000000",
      fontStyle: "italic",
      textAlign: 'justify',
      lineHeight: 15
    },
    grammatica: {
      fontSize: 13,
      color: "#000000",
      textAlign: 'justify',
      lineHeight: 15
    },
    traduzione: {
      fontSize: 15,
      color: "#000000",
      textAlign: 'justify',
      lineHeight:20
    },
    scrollView:{
      width: '97%'
    },
    sView: {
      justifyContent: 'space-around',
      alignItems: 'stretch'
    },
    arrow: {
      width: 20,
      height: 20,
      marginTop: '20%'
    },
    dataWrapper: {
      marginTop: -1
    },
    conjView:{
      paddingBottom: '15%'
    },
    headerTable: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'justify',
      lineHeight: 20
    },
    secondHeaderTable: {
      fontSize: 17,
      fontStyle: "italic",
      textAlign: 'justify',
      lineHeight: 18
    },
    flexionView: {
      justifyContent: 'space-around',
      alignItems: 'stretch'
    },
    titleTable: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign : 'center'
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20
    },
    checkbox: {
      alignSelf: "center",
    },
    titleMode: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign : 'center'
    },
    modeContainer: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'flex-start'
    },
    arrow2: {
      width: 20,
      height: 20,
      marginTop: '30%',
      marginRight: '60%'
    }
  }) 

export default styles