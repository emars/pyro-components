import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const Signup = ({
  email,
  password,
  confirmPassword,
  setPassword,
  setEmail,
  onSubmit,
  setConfirmPassword
}) => {
  return (
    <Paper {...{ style: { padding: 16, maxWidth: 300 } }}>
      <Typography {...{ type: 'title' }}>Sign Up</Typography>
      <form {...{ onSubmit }}>
        <TextField
          {...{
            value: email,
            onChange: e => setEmail(e.target.value),
            fullWidth: true,
            label: 'Email'
          }}
        />
        <TextField
          {...{
            value: password,
            onChange: e => setPassword(e.target.value),
            fullWidth: true,
            label: 'Password',
            type: 'password'
          }}
        />
        <TextField
          {...{
            value: confirmPassword,
            onChange: e => setConfirmPassword(e.target.value),
            fullWidth: true,
            label: 'Confirm Password',
            type: 'password'
          }}
        />
        <div {...{ style: { textAlign: 'center' } }}>
          <Button {...{ type: 'submit' }}>Sign Up</Button>
        </div>
      </form>
    </Paper>
  )
}

export default compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('confirmPassword', 'setConfirmPassword', ''),
  withHandlers({
    onSubmit: ({ email, password, confirmPassword, signup }) => e => {
      e.preventDefault()

      const authData = {
        email,
        password
      }

      signup(authData)
    }
  })
)(Signup)
