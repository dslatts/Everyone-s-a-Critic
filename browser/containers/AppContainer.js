import React from 'react'
import { connect } from 'react-redux';
import socket from '../socket.js'


import { handleCreatedGame, handleUserJoin } from '../actions'

import TitleScreenContainer from './TitleScreenContainer'
import GameContainer from './GameContainer'

const mapStateToProps = (state) => {
  return {
    host: state.host,
    room: state.room,
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreatedGame(roomId){
      dispatch(handleCreatedGame(roomId))
    },
    handleUserJoin(user){
      dispatch(handleUserJoin(user))
    }
  }
}


//this is the top level container

class AppContainer extends React.Component{

  constructor(props){
    super(props)
    this.handleRoomEvent = this.handleRoomEvent.bind(this);
    this.handleUserJoin = this.handleUserJoin.bind(this);
  }

  componentDidMount(){
    socket.on('roomCreated', this.handleRoomEvent)
    socket.on('userJoined', this.handleUserJoin)
  }

  handleRoomEvent(room){
      this.props.handleCreatedGame(room.roomId);
  }

  handleUserJoin(user){
    this.props.handleUserJoin(user);
  }

  render(){
    return (
      <div className="container">
        {this.props.room ? <GameContainer users={this.props.users} host={this.props.host} /> : <TitleScreenContainer /> }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
