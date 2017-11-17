import React from 'react'
import { Auth, LogoutButton } from '../lib'
import Typography from 'material-ui/Typography'
import './firebase'

const Demo = ({ children }) => (
  <div
    {...{
      style: {
        marginTop: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }}
  >
    {children}
  </div>
)

const App = () => {
  return (
    <div
      {...{
        style: {
          margin: '0 auto',
          width: 900
        }
      }}
    >
      <Typography {...{ type: 'title' }}>Auth Signup</Typography>
      <Demo>
        <Auth
          {...{
            isSignUp: true,
            onSuccess: user => {
              console.log(user)
              alert(`Signed up user: ${user.uid}`)
            },
            onFail: errorCode => {}
          }}
        />
      </Demo>
      <Typography {...{ type: 'title' }}>Auth Login</Typography>
      <Demo>
        <Auth
          {...{
            isSignUp: false,
            onSuccess: user => {
              console.log(user)
              alert(`Logged in user: ${user.uid}`)
            },
            onFail: errorCode => {}
          }}
        />
      </Demo>
      <Typography {...{ type: 'title' }}>Logout Button</Typography>
      <Demo>
        <LogoutButton
          {...{
            onError: () => {
              alert('failed')
            },
            onSuccess: () => {
              alert('logged out')
            }
          }}
        >
          Log Out
        </LogoutButton>
      </Demo>
    </div>
  )
}

export default App
