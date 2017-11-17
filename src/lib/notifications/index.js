/**
 * export: reducer, component, action creators
 * 
 * Internal redux OR redux with the rest of the app
 */
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'

// API
export const showNotification = message => ({
  type: SHOW_NOTIFICATION,
  message
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
})

// REDUX
const SHOW_NOTIFICATION = '@pyro/notifications/SHOW_NOTIFICATION'
const HIDE_NOTIFICATION = '@pyro/notifications/HIDE_NOTIFICATION'

const initialState = {
  message: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: action.message
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}

const selectCurrentNotification = state => {
  return state.notifications.message
}

// COMPONENT
const NotificationCenter = ({ open, message, onRequestClose }) => (
  <Snackbar
    {...{
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      open,
      message: message || '',
      autoHideDuration: 5000,
      onRequestClose
    }}
  />
)

// CONTAINER
const mapStateToProps = state => ({
  open: !!selectCurrentNotification(state),
  message: selectCurrentNotification(state)
})

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => {
    dispatch(hideNotification())
  }
})

const NotificationCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationCenter)

// default export is the container
export const component = NotificationCenterContainer
