//ACTION TYPES
  export const RECEIVE_ROOM = 'RECEIVE_ROOM';
  export const RECEIVE_HOST = 'RECEIVE_HOST';
  export const RECEIVE_USER = 'RECEIVE_USER';

//ACTION CREATORS
  const receiveRoom = (roomId) => ({type: RECEIVE_ROOM, room: roomId});
  const receiveHost = () => ({type: RECEIVE_HOST, host: true});
  const receiveUser = (user) => ({type: RECEIVE_USER, user: user});
//DISPATCHER

  export const handleCreatedGame = (roomId) => (dispatch) => {
    dispatch(receiveRoom(roomId));
    dispatch(receiveHost());
  }

  export const handleJoinGame = (roomId) => (dispatch) => {
    dispatch(receiveRoom(roomId));
  }

  export const handleUserJoin = (user) => dispatch => {
    dispatch(receiveUser(user));
  }
