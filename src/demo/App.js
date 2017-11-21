import React from 'react'
import { connect } from 'react-redux'
import {
  Auth,
  LogoutButton,
  Notifications,
  AnonymousAuthButton,
  Confirmable,
  Pulsed,
  FeaturesOne,
  CTAOne
} from '../lib'
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

const PulsedButton = () => (
  <Pulsed
    {...{
      content: (
        <div>
          <Typography {...{ type: 'title' }}>Pulsed Button</Typography>
          <Typography {...{ type: 'body1' }}>
            Thanks for clicking me friend, I'm a pulsed button and I'm useful
            for feature discovery.
          </Typography>
        </div>
      )
    }}
  >
    <Button {...{ raised: true }}>I'm a pulsed button</Button>
  </Pulsed>
)

const ConfirmableDemo = connect(null, dispatch => ({
  showConfirmable: () =>
    dispatch(
      Confirmable.confirmableAction(
        Notifications.showNotification('Confirmed, yo.'),
        {
          title: 'Are you sure you want to show a message?',
          message:
            'Here is some content that can be put in the action. It can be used to explain the effects of your action.'
        }
      )
    )
}))(({ showConfirmable }) => (
  <Button {...{ onClick: () => showConfirmable() }}>Show Confirmable</Button>
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
      <Typography {...{ type: 'title' }}>Anonymous Auth Button</Typography>
      <Demo>
        <AnonymousAuthButton
          {...{
            afterSignedIn: () => {
              alert('signed in anonymously')
            }
          }}
        />
      </Demo>
      <Typography {...{ type: 'title' }}>Confirmable Dialog</Typography>
      <Demo>
        <Confirmable.component />
        <ConfirmableDemo />
      </Demo>
      <Typography {...{ type: 'title' }}>Pulsed</Typography>
      <Demo>
        <PulsedButton />
      </Demo>
      <Typography {...{ type: 'title' }}>Design Blocks</Typography>
      <Typography {...{ type: 'title' }}>Call To Action</Typography>
      <Demo>
        <CTAOne />
      </Demo>
      <Typography {...{ type: 'title' }}>Features</Typography>
      <Demo>
        <FeaturesOne
          {...{
            features: []
          }}
        />
      </Demo>
    </div>
  )
}

export default App
