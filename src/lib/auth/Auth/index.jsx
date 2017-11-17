import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import PropTypes from 'prop-types'

const ErrorMessage = ({ children }) => (
  <Typography
    {...{
      type: 'body1',
      style: {
        color: 'red'
      }
    }}
  >
    {children}
  </Typography>
)

class Auth extends Component {
  static contextTypes = {
    firebaseApp: PropTypes.object
  }
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    signingIn: false
  }
  handleEmailChange = e => this.setState({ email: e.target.value })
  handlePasswordChange = e => this.setState({ password: e.target.value })
  handleConfirmPasswordChange = e =>
    this.setState({ confirmPassword: e.target.value })
  handleSubmit = e => {
    this.setState({ signingIn: true })
    e.preventDefault()

    if (this.props.isSignUp) {
      const signupArgs = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }

      this.handleSignUp(signupArgs)
    } else {
      const loginArgs = {
        email: this.state.email,
        password: this.state.password
      }
      this.handleLogin(loginArgs)
    }
  }

  handleLogin = loginArgs => {
    this.context.firebaseApp
      .auth()
      .signInWithEmailAndPassword(loginArgs.email, loginArgs.password)
      .then(user => {
        this.props.onSuccess && this.props.onSuccess(user)
        this.setState({
          signingIn: false,
          errorMessage: null,
          email: '',
          password: ''
        })
      })
      .catch(err => {
        const errorCode = err.code
        let errorMessage
        switch (errorCode) {
          case 'auth/user-disabled':
            errorMessage = (
              <div>
                <ErrorMessage>
                  The user for the corresponding email has been disabled! Please
                  check with support for more information.
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/invalid-email':
            errorMessage = (
              <div>
                <ErrorMessage>
                  That email is not valid. Please check the formatting to make
                  sure it is a valid email address!
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/user-not-found':
            errorMessage = (
              <div>
                <ErrorMessage>
                  There is no user for that email address. If you need an
                  account, try signing up!
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/wrong-password':
            errorMessage = (
              <div>
                <ErrorMessage>
                  The password for that account was incorrect!
                </ErrorMessage>
              </div>
            )
            break
          default:
            console.error('Unknown Firebase:Auth:Signup Error Occured')
            console.error(err)
            errorMessage = (
              <div>
                <Typography {...{ type: 'body1' }}>
                  An unknown error occured when trying to create your account!
                </Typography>
              </div>
            )
        }

        this.setState({
          errorMessage,
          signingIn: false
        })
      })
  }

  handleSignUp = signUpArgs => {
    if (signUpArgs.password !== signUpArgs.confirmPassword) {
      return this.setState({
        errorMessage: <ErrorMessage>Passwords must match!</ErrorMessage>,
        signingIn: false
      })
    }

    this.context.firebaseApp
      .auth()
      .createUserWithEmailAndPassword(signUpArgs.email, signUpArgs.password)
      .then(user => {
        this.props.onSuccess && this.props.onSuccess(user)
        this.setState({
          signingIn: false,
          errorMessage: false,
          email: '',
          password: '',
          confirmPassword: ''
        })
      })
      .catch(err => {
        const errorCode = err.code
        let errorMessage
        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = (
              <div>
                <ErrorMessage>
                  That email is already in use. Do you already have an account?
                  Try logging in!
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/invalid-email':
            errorMessage = (
              <div>
                <ErrorMessage>
                  That email is not valid. Please check the formatting to make
                  sure it is a valid email address!
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/operation-not-allowed':
            errorMessage = (
              <div>
                <ErrorMessage>
                  Hey developer, make sure you enable email/password accounts in
                  the Firebase Console, under the Auth tab.
                </ErrorMessage>
              </div>
            )
            break
          case 'auth/weak-password':
            errorMessage = (
              <div>
                <ErrorMessage>
                  Your password was not strong enough!
                </ErrorMessage>
              </div>
            )
            break
          default:
            console.error('Unknown Firebase:Auth:Signup Error Occured')
            console.error(err)
            errorMessage = (
              <div>
                <Typography {...{ type: 'body1' }}>
                  An unknown error occured when trying to create your account!
                </Typography>
              </div>
            )
        }

        this.setState({
          errorMessage,
          signingIn: false
        })
      })
  }

  render() {
    console.log(this.context)

    let formText
    let formTitle = this.props.isSignUp ? 'Sign Up' : 'Log In'
    if (!this.state.signingIn) {
      formText = this.props.isSignUp ? 'Sign Up' : 'Log In'
    } else {
      formText = this.props.isSignUp ? 'Signing Up...' : 'Logging In...'
    }
    const showError = !!this.state.errorMessage

    console.log(showError)

    return (
      <Paper {...{ style: { width: 400 } }}>
        <AppBar
          {...{
            position: 'static',
            color: 'primary'
          }}
        >
          <Toolbar>
            <Typography {...{ type: 'title', color: 'inherit' }}>
              {formTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <div {...{ style: { padding: 16 } }}>
          {showError && this.state.errorMessage}
          <form {...{ onSubmit: this.handleSubmit }}>
            <TextField
              {...{
                value: this.state.email,
                onChange: this.handleEmailChange,
                fullWidth: true,
                label: 'Email'
              }}
            />
            <TextField
              {...{
                value: this.state.password,
                onChange: this.handlePasswordChange,
                fullWidth: true,
                label: 'Password',
                type: 'password'
              }}
            />
            {this.props.isSignUp && (
              <TextField
                {...{
                  value: this.state.confirmPassword,
                  onChange: this.handleConfirmPasswordChange,
                  fullWidth: true,
                  label: 'Confirm Password',
                  type: 'password'
                }}
              />
            )}
            <div {...{ style: { marginTop: 24, textAlign: 'center' } }}>
              <Button {...{ raised: true, type: 'submit', color: 'primary' }}>
                {formText}
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    )
  }
}

export default Auth
