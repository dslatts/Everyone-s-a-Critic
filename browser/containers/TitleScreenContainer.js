import React from 'react'
import TitleScreen from '../components/TitleScreen'
import JoinRoom from '../components/JoinRoom'
// import { connect } from 'react-redux'
import socket from '../socket.js';

export default class TitleScreenContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {showLogin: false, roomForm: '', nameForm: ''}
    this.handleCreateGame = this.handleCreateGame.bind(this)
    this.handleJoinGame = this.handleJoinGame.bind(this)
    this.handleHideLogin = this.handleHideLogin.bind(this)
    this.handleNewUser = this.handleNewUser.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreateGame(event){
    event.preventDefault();
    socket.emit('createRoom');

  }

  handleNewUser(event){
    event.preventDefault();
    socket.emit('newUser', {room: +this.state.roomForm, userName: this.state.nameForm})
    console.log('here');
  }

  handleChange(event){
    event.preventDefault();
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
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
    {this.state.showLogin ? <JoinRoom handleChange= {this.handleChange} roomval={this.state.roomForm} nameval={this.state.nameForm} handlePlay={this.handleNewUser} handleBack={this.handleHideLogin} /> : <TitleScreen handleCreateGame={this.handleCreateGame} handleJoinGame ={this.handleJoinGame} />}
    </div>
    )
  }
}

