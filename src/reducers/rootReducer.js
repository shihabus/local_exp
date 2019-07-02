import { combineReducers } from 'redux'

import { authReducer as auth } from './auth'

const rootReducer = combineReducers({
  auth,
})

export default rootReducer