import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const composedEnhancer = compose(
  applyMiddleware(thunk, logger)
)

const initStore = () => createStore(rootReducer, {}, composedEnhancer)

export { initStore }