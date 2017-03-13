import React from 'react';
import Waiting from '../components/Waiting'
import socket from '../socket.js'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    host: state.host,
    room: state.room
  };
}

class GameContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {round: null}
  }

  componentWillUnmount(){
    socket.emit('userDisconnect', {user: this.state.userID})
  }

  render(){
    return (
      <div>
      {this.state.round ? <h1> ROUND FOUND </h1> : <Waiting room={this.props.room} host={this.props.host} />}
      </div>
    );
  }
}
export default connect(mapStateToProps)(GameContainer);
