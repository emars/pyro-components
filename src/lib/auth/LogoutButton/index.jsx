import React, { Component } from 'react'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

class LogoutButton extends Component {
  static contextTypes = {
    firebaseApp: PropTypes.object
  }
  handleLogout = () => {
    this.context.firebaseApp
      .auth()
      .signOut()
      .then(() => {
        this.props.onSuccess && this.props.onSuccess()
      })
      .catch(err => {
        this.props.onError && this.props.onError(err)
      })
  }
  render() {
    return (
      <Button
        {...{
          ...this.props,
          onClick: this.handleLogout
        }}
      >
        {this.props.children || 'Log Out'}
      </Button>
    )
  }
}

export default LogoutButton
