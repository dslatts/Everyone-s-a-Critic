import React from 'react'
import { connect } from 'react-redux';
import socket from '../socket.js'


import { handleCreatedGame } from '../actions'

import TitleScreenContainer from './TitleScreenContainer'
import GameContainer from './GameContainer'

const mapStateToProps = (state) => {
  return {
    host: state.host,
    room: state.room
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreatedGame(roomId){
      dispatch(handleCreatedGame(roomId))
    }
  }
}


//this is the top level container

class AppContainer extends React.Component{

  constructor(props){
    super(props)
    this.handleRoomEvent = this.handleRoomEvent.bind(this);
  }

  componentDidMount(){
    socket.on('roomCreated', this.handleRoomEvent)
  }

  handleRoomEvent(room){
      this.props.handleCreatedGame(room.roomId);
  }

  render(){
    return (
      <div className="container">
        {this.props.room ? <GameContainer host={this.props.host} /> : <TitleScreenContainer /> }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
