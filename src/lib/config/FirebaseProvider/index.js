import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FirebaseProvider extends Component {
  getChildContext() {
    const ctx = {
      firebaseApp: this.props.firebaseApp
    }
    return ctx
  }
  render() {
    return this.props.children
  }
}

FirebaseProvider.childContextTypes = {
  firebaseApp: PropTypes.object
}

export default FirebaseProvider
