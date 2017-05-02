import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import rootReducer from './reducers/'
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
);

export default store;
