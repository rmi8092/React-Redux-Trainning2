import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import appReducer from './reducer'

const reducers = combineReducers({
  routing,
  appReducer
})

export default reducers
