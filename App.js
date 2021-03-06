
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
    Alert
} from 'react-native';
import params from './src/params'
import MineField from './src/components/minedfield'
import Header from './src/components/header'
import {createMinedBoard,cloneBoard,openField,hadExplosion,wonGame,showMines,invertFlag, flagsUsed} from  './src/functions'

export default  class App extends  Component{

  constructor(props) {
    super(props)
    this.state= this.createState()
  }

  minesAmount = ()=>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  createState = ()=>{
    const cols= params.getColumnsAmount()
    const rows = params.getRowsAmount()
  return{
      board:createMinedBoard(rows,cols, this.minesAmount()),
      won:false,
      lost: false
  }
  }
  onOpenField = (row,column) => {
    const board=cloneBoard(this.state.board)
    openField(board,row,column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost){
      Alert.alert('otário, perdeu')
      showMines(board)
    }
    if(won){
      Alert.alert('ganhou, otário')
    }
    this.setState({board, won, lost})
  }
  onSelectField = (row,column)=>{
    const board = cloneBoard(this.state.board)
    invertFlag(board,row,column)
    const won = wonGame(board)

    if(won){
      Alert.alert('ganhou, otário')
    }
    this.setState({board,won})
  }

  render(){
    return(
        <View style={styles.container}>
        <Header flagsLeft={this.minesAmount()-flagsUsed(this.state.board)}
                onNewGame={()=>this.setState(this.createState())}></Header>


          <View style={styles.board}>
            <MineField board={this.state.board}
                       onOpenField={this.onOpenField}
                       onSelectField={this.onSelectField}/>
          </View>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end'
  },
  board:{
    alignItems:'center',
    backgroundColor:'#aaa'
  }
});


