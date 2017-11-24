/**
 * Redux Module used to store an action while a user is confirming it
 * requires redux-thunk
 */
import React from 'react'
import { connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { put, select, takeEvery } from 'redux-saga/effects'

const CONFIRMABLE_ACTION_START = '@pyro/confirmable/CONFRIMABLE_ACTION_START'
const CONFIRMABLE_ACTION_CONFIRM =
  '@pyro/confirmable/CONFRIMABLE_ACTION_CONFIRM'
const CONFIRMABLE_ACTION_CONFIRM_COMPLETE =
  '@pyro/confirmable/CONFRIMABLE_ACTION_CONFIRM_COMPLETE'
const CONFIRMABLE_ACTION_DENY = '@pyro/confirmable/CONFRIMABLE_ACTION_DENY'

export const confirmableAction = (action, settings = {}) => ({
  type: CONFIRMABLE_ACTION_START,
  confirmableAction: action,
  title: settings.title,
  message: settings.message
})

const confirmAction = () => ({
  type: CONFIRMABLE_ACTION_CONFIRM
})

const denyAction = () => ({
  type: CONFIRMABLE_ACTION_DENY
})

const initialState = {
  currentAction: null,
  title: null,
  message: null
}

function* handleConfirmAction(action) {
  const currentAction = yield select(selectCurrentConfirmableAction)
  yield put(currentAction)
  yield put({
    type: CONFIRMABLE_ACTION_CONFIRM_COMPLETE
  })
}

export function* saga() {
  yield takeEvery(CONFIRMABLE_ACTION_CONFIRM, handleConfirmAction)
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRMABLE_ACTION_START:
      return {
        ...state,
        currentAction: action.confirmableAction,
        title: action.title,
        message: action.message
      }
    case CONFIRMABLE_ACTION_CONFIRM_COMPLETE:
      return {
        ...state,
        currentAction: null,
        title: null,
        message: null
      }
    case CONFIRMABLE_ACTION_DENY:
      return {
        ...state,
        currentAction: null
      }
    default:
      return state
  }
}

export const selectCurrentConfirmableAction = state => {
  return state.confirmable.currentAction
}

export const selectCurrentConfirmableTitle = state => state.confirmable.title

export const selectCurrentConfirmableMessage = state =>
  state.confirmable.message

const ConfirmableDialog = ({ open, onYes, onNo, title, message }) => {
  console.log('RENDERING CONFIRMABLE DIALOG OPEN', open)
  return (
    open && (
      <Dialog
        {...{
          open,
          onRequestClose: onNo
        }}
      >
        <DialogTitle>{title || 'Are you sure?'}</DialogTitle>
        <DialogContent>
          {message && <Typography {...{ type: 'body1' }}>{message}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            {...{
              color: 'primary',
              onClick: onNo
            }}
          >
            No
          </Button>
          ,
          <Button
            {...{
              color: 'primary',
              onClick: onYes
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  )
}

const mapStateToProps = state => ({
  open: !!selectCurrentConfirmableAction(state),
  title: selectCurrentConfirmableTitle(state),
  message: selectCurrentConfirmableMessage(state)
})

const mapDispatchToProps = dispatch => ({
  onYes: () => {
    dispatch(confirmAction())
  },
  onNo: () => {
    dispatch(denyAction())
  }
})

export const component = connect(mapStateToProps, mapDispatchToProps)(
  ConfirmableDialog
)
