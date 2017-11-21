/**
 * Logs in a user to anonymous auth account
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

class AnonymousAuthButton extends Component {
  static contextTypes = {
    firebaseApp: PropTypes.object
  }
  state = {
    loggingIn: false
  }
  handleClick = () => {
    this.setState({
      loggingIn: true
    })

    const firebaseApp = this.context.firebaseApp
    if (!firebaseApp) throw new Error('Missing Firebase App in Context!')

    const auth = firebaseApp.auth()

    let promise
    if (auth.currentUser) {
      promise = Promise.resolve(auth.currentUser)
    } else {
      promise = auth.signInAnonymously()
    }

    promise
      .then(user => {
        this.setState({ loggingIn: false })
        this.props.afterSignedIn && this.props.afterSignedIn(user)
      })
      .catch(err => {
        console.error(
          'Something strange happed in the Anonymous Auth Component.'
        )
        console.error(err)
        this.props.onError && this.props.onError(err)
      })
  }
  render() {
    const buttonText = this.state.loggingIn
      ? this.props.loggingInText || 'Setting Up Demo...'
      : this.props.text || 'Try it out'
    return (
      <Button
        {...{
          raised: true,
          color: 'primary',
          onClick: this.handleClick
        }}
      >
        {buttonText}
      </Button>
    )
  }
}

export default AnonymousAuthButton
