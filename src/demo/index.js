/**
 * Show off the authentication stuff
 * 
 * maybe include some documentation
 */
import React from 'react'
import reactDOM from 'react-dom'
import App from './App'
import FirebaseProvider from '../lib/config/FirebaseProvider'
import firebaseApp from './firebase'

reactDOM.render(
  <FirebaseProvider
    {...{
      firebaseApp
    }}
  >
    <App />
  </FirebaseProvider>,
  document.getElementById('root')
)
