const chance = require('chance')
let socket

//HOST function
const createRoom = () => {
  let roomId = chance.word({length: 4});

  this.emit('roomCreated', {roomId: roomId, socketId: this.id});

  this.join(roomId);
}

//Player function
const joinRoom = (data) => {
  const playerSocket = this;
  const room = socket.manager.rooms['/' + data.roomId];
  if (room) {
    data.id = playerSocket.id
    playerSocket.join(data.roomId)
  }
  else {
    this.emit('error', {message: 'room does not exist'})
  }
}
