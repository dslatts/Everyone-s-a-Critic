import React from 'react'
import TitleScreen from '../components/TitleScreen'
import JoinRoom from '../components/JoinRoom'
// import { connect } from 'react-redux'
import socket from '../socket.js';

export default class TitleScreenContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {showLogin: false}
    this.handleCreateGame = this.handleCreateGame.bind(this)
    this.handleJoinGame = this.handleJoinGame.bind(this)
    this.handleHideLogin = this.handleHideLogin.bind(this)
  }

  handleCreateGame(event){
    event.preventDefault()
    socket.emit('createRoom');

  }

  handleJoinGame(event){
    event.preventDefault();
    this.setState({showLogin: true});

  }

  handleHideLogin(event){
    event.preventDefault();
    this.setState({showLogin: false});
  }

  render(){
    return (
    <div>
    {this.state.showLogin ? <JoinRoom handleBack={this.handleHideLogin} /> : <TitleScreen handleCreateGame={this.handleCreateGame} handleJoinGame ={this.handleJoinGame} />}
    </div>
    )
  }
}

