import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const Login = ({
  email,
  password,
  kind,
  confirmPassword,
  setPassword,
  setEmail,
  onSubmit
}) => {
  return (
    <Paper {...{ style: { padding: 16, maxWidth: 300 } }}>
      <Typography {...{ type: 'title' }}>Log In</Typography>
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
        <div {...{ style: { marginTop: 8, textAlign: 'center' } }}>
          <Button {...{ type: 'submit' }}>Log In</Button>
        </div>
      </form>
    </Paper>
  )
}

export default compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onSubmit: ({ email, password, login }) => e => {
      e.preventDefault()

      const authData = {
        email,
        password
      }

      login(authData)
    }
  })
)(Login)
