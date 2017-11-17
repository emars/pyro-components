/**
 * Show off the authentication stuff
 * 
 * maybe include some documentation
 */
import React from 'react'
import reactDOM from 'react-dom'
import App from './App'
import { FirebaseProvider, Notifications } from '../lib'
import { Provider } from 'react-redux'
import firebaseApp from './firebase'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

const rootReducer = combineReducers({
  notifications: Notifications.reducer
})
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const middleware = []
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
const initialState = {}
const store = createStore(rootReducer, initialState, composedEnhancers)

reactDOM.render(
  <Provider {...{ store }}>
    <FirebaseProvider
      {...{
        firebaseApp
      }}
    >
      <App />
    </FirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
