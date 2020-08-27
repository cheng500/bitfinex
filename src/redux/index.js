import { createStore, applyMiddleware, compose } from 'redux'

import createRootReducer from './reducers'

import wsMiddleware from './middlewares/websocket'

export function configureStore(optionalMiddleware = []) {
  let middleware = [
    wsMiddleware(),
    ...optionalMiddleware
  ]

  const enhancers = compose(applyMiddleware(...middleware))

  const store = createStore(
    createRootReducer(),
    {},
    enhancers
  )

  return store
}
