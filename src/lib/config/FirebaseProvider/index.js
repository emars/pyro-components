import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FirebaseProvider extends Component {
  getChildContext() {
    const ctx = {
      firebaseApp: this.props.firebaseApp
    }
    console.log('gettin child context', ctx)
    return ctx
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

FirebaseProvider.childContextTypes = {
  firebaseApp: PropTypes.object
}

export default FirebaseProvider
