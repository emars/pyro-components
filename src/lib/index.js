import Login from './components/Login'
import Signup from './components/Signup'

import React from 'react'
import Paper from 'material-ui/Paper'
import { compose } from 'recompose'

const Dank = ({}) => <Paper {...{ style: { padding: 16 } }}>dank</Paper>

export const Test = ({}) => <Paper>test</Paper>
const identity = x => x

export default compose(identity)(Dank)

export { Login, Signup }
