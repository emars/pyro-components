import React from 'react'
import { connect } from 'react-redux'
import { Auth, LogoutButton, Notifications } from '../lib'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
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

const NotificationDemo = connect(null, dispatch => ({
  showNotification: () =>
    dispatch(Notifications.showNotification('This is a notification.'))
}))(({ showNotification }) => (
  <Button {...{ onClick: () => showNotification() }}>Show Notification</Button>
))

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
      <Typography {...{ type: 'title' }}>Notification Center</Typography>
      <Demo>
        <Notifications.component />
        <NotificationDemo />
      </Demo>
    </div>
  )
}

export default App
