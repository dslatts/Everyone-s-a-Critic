import {RECEIVE_HOST, RECEIVE_ROOM, RECEIVE_USER} from '../actions';

const initialState = {host: false, room: null, users: []}

export default function rootReducer(state = initialState, action){
  const newState = Object.assign({}, state)
  switch (action.type){
    case RECEIVE_ROOM:
      newState.room = action.room;
      break

    case RECEIVE_HOST:
      newState.host = action.host;
      break

    case RECEIVE_USER:
      newState.users = [...newState.users, action.user.name];
      break

    default:
      return state
  }
  return newState
}
