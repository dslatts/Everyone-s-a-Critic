//ACTION TYPES
  export const RECEIVE_ROOM = 'RECEIVE_ROOM';
  export const RECEIVE_HOST = 'RECEIVE_HOST';

//ACTION CREATORS
  const receiveRoom = (roomId) => ({type: RECEIVE_ROOM, room: roomId});
  const receiveHost = () => ({type: RECEIVE_HOST, host: true});

//DISPATCHER

  export const handleCreatedGame = (roomId) => (dispatch) => {
    dispatch(receiveRoom(roomId));
    dispatch(receiveHost());
  }

  export const handleJoinGame = (roomId) => (dispatch) => {
    dispatch(receiveRoom(roomId));
  }
